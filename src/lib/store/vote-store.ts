import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { 
  voteStorageSchema, 
  type VotePayload, 
  type VoteStorage,
  validateVotePayload 
} from "@/lib/validations/vote.schema";
import { useModal } from "@/components/ui/core/providers/ContextProvider";

interface VoteState extends VoteStorage {
  _hasHydrated: boolean;
  _isProcessing: boolean;

  setHasHydrated: (state: boolean) => void;
  hasVoted: (inovasiId: string) => boolean;
  addVote: (payload: VotePayload) => { 
    success: boolean; 
    reason?: string;
    details?: any;
  };
  removeVote: (inovasiId: string) => void;
  clearAllVotes: () => void;
  getVoteCount: () => number;
  associateWithUser: (userId: string) => void;
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set, get) => ({
      userId: undefined,
      votes: [],
      version: 1,
      _hasHydrated: false,
      _isProcessing: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      hasVoted: (inovasiId: string) => {
        const state = get();
        return state.votes.some((vote) => vote.inovasiId === inovasiId);
      },

      /**
       * Tambahkan vote baru dengan validasi LENGKAP
       * Menggunakan safeParse untuk error handling yang baik
       */
      addVote: (payload: VotePayload) => {
        const state = get();

        // Lock untuk mencegah race condition
        if (state._isProcessing) {
          return {
            success: false,
            reason: "Sedang memproses vote lain, tunggu sebentar...",
          };
        }

        // Set processing flag
        set({ _isProcessing: true });

        try {
          // 🔍 DEBUG LOG
          console.log('📦 ADD VOTE - Payload received:', payload);

          // ✅ VALIDASI PAYLOAD dengan safeParse
          const validation = validateVotePayload(payload);
          
          if (!validation.success) {
            set({ _isProcessing: false });
            console.error('❌ Validation failed:', validation);
            return {
              success: false,
              reason: validation.error || "Data vote tidak valid",
              details: {
                receivedId: validation.receivedValue?.inovasiId,
                expectedFormat: "UUID v4 atau slug (kebab-case)",
              },
            };
          }

          // Cek duplikasi (idempotency)
          if (state.hasVoted(validation.data!.inovasiId)) {
            set({ _isProcessing: false });
            return {
              success: false,
              reason: "Kamu sudah pernah mendukung inovasi ini",
            };
          }

          // Validasi storage dengan Zod
          const newVotes = [
            ...state.votes,
            {
              inovasiId: validation.data!.inovasiId,
              inovasiTitle: validation.data!.inovasiTitle,
              votedAt: validation.data!.timestamp || Date.now(),
            },
          ];

          const storageValidation = voteStorageSchema.safeParse({
            ...state,
            votes: newVotes,
          });

          if (!storageValidation.success) {
            set({ _isProcessing: false });
            console.error('❌ Storage validation failed:', storageValidation.error);
            return {
              success: false,
              reason: "Gagal menyimpan ke storage",
            };
          }

          // ✅ Tambahkan vote
          set((state) => ({
            votes: newVotes,
            _isProcessing: false,
          }));

          console.log('✅ Vote added successfully:', validation.data);
          return { success: true };

        } catch (error) {
          set({ _isProcessing: false });
          console.error("❌ Error adding vote:", error);
          return {
            success: false,
            reason: "Terjadi kesalahan saat menyimpan vote",
            details: error,
          };
        }
      },

      removeVote: (inovasiId: string) => {
        set((state) => ({
          votes: state.votes.filter((vote) => vote.inovasiId !== inovasiId),
        }));
      },

      clearAllVotes: () => {
        set({
          votes: [],
          userId: undefined,
        });
      },

      getVoteCount: () => {
        return get().votes.length;
      },

      associateWithUser: (userId: string) => {
        set({ userId });
      },
    }),
    {
      name: "satusuara-votes",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        userId: state.userId,
        votes: state.votes,
        version: state.version,
      }),
      version: 1,
    }
  )
);

// Selector hooks
export const useHasVoted = (inovasiId: string) =>
  useVoteStore((state) => state.hasVoted(inovasiId));

export const useVoteCount = () =>
  useVoteStore((state) => state.getVoteCount());

export const useIsVoteHydrated = () =>
  useVoteStore((state) => state._hasHydrated);