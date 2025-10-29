"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useVoteStore } from "@/lib/store/vote-store";
import { useOnboardingStore } from "@/hooks/use-store-signup";
import { validateVotePayload, isValidUUID, isValidSlug } from "@/lib/validations/vote.schema";
import { toast } from "sonner";

interface UseVoteOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onUnauthorized?: () => void;
  redirectToLogin?: boolean;
}

interface UseVoteReturn {
  vote: (inovasiId: string, inovasiTitle?: string) => Promise<void>;
  unvote: (inovasiId: string) => void;
  hasVoted: (inovasiId: string) => boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  voteCount: number;
}

export function useVote(options: UseVoteOptions = {}): UseVoteReturn {
  const {
    onSuccess,
    onError,
    onUnauthorized,
    redirectToLogin = true,
  } = options;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { name: userName, _hasHydrated: authHydrated } = useOnboardingStore();
  const {
    addVote,
    removeVote,
    hasVoted: checkHasVoted,
    getVoteCount,
    _hasHydrated: voteHydrated,
  } = useVoteStore();

  const isAuthenticated = authHydrated && !!userName;

  const vote = useCallback(
    async (inovasiId: string, inovasiTitle?: string) => {
      // 🔍 DEBUG: Log input
      console.log('🎯 VOTE FUNCTION CALLED:', {
        inovasiId,
        inovasiTitle,
        typeofId: typeof inovasiId,
        idLength: inovasiId?.length,
        isUUID: isValidUUID(inovasiId),
        isSlug: isValidSlug(inovasiId),
      });

      // Guard: Cek hydration
      if (!authHydrated || !voteHydrated) {
        toast.error("Mohon tunggu sebentar...");
        return;
      }

      setIsLoading(true);

      try {
        // 1. Cek Authentication
        if (!isAuthenticated) {
          setIsLoading(false);
          
          toast.error("Silakan masuk terlebih dahulu untuk memberikan dukungan", {
            action: redirectToLogin
              ? {
                  label: "Masuk",
                  onClick: () => router.push("/masuk"),
                }
              : undefined,
          });

          if (onUnauthorized) {
            onUnauthorized();
          } else if (redirectToLogin) {
            router.push("/masuk");
          }
          return;
        }

        // 2. Cek apakah sudah vote
        if (checkHasVoted(inovasiId)) {
          setIsLoading(false);
          toast.info("Kamu sudah pernah mendukung inovasi ini");
          return;
        }

        // 3. ✅ PRE-VALIDATION Check
        if (!inovasiId || typeof inovasiId !== 'string') {
          setIsLoading(false);
          toast.error(`ID inovasi tidak valid: "${inovasiId}"`, {
            description: `Tipe data: ${typeof inovasiId}. Hubungi developer.`,
          });
          console.error('❌ ID inovasi tidak valid:', inovasiId);
          if (onError) onError(`ID tidak valid: ${inovasiId}`);
          return;
        }

        // 4. ✅ Validasi payload dengan safeParse
        const validation = validateVotePayload({
          inovasiId,
          inovasiTitle,
          timestamp: Date.now(),
        });

        if (!validation.success) {
          setIsLoading(false);
          
          // Toast dengan info debugging
          toast.error(validation.error || "Data tidak valid", {
            description: `ID yang diterima: "${validation.receivedValue?.inovasiId}". ${
              isValidSlug(inovasiId) ? 'Terdeteksi sebagai slug, bukan UUID.' : ''
            }`,
          });
          
          console.error('❌ VALIDATION FAILED:', validation);
          
          if (onError) onError(validation.error || "Data tidak valid");
          return;
        }

        // 5. ✅ Tambahkan vote
        const result = addVote(validation.data!);

        setIsLoading(false);

        if (result.success) {
              if (onSuccess) onSuccess();
          toast.success("Terima kasih! Dukungan Anda telah tercatat");
          
      
        } else {
          toast.error(result.reason || "Gagal menyimpan vote", {
            description: result.details ? `Detail: ${JSON.stringify(result.details)}` : undefined,
          });
          
          if (onError) onError(result.reason || "Gagal menyimpan vote");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("❌ VOTE ERROR:", error);
        toast.error("Terjadi kesalahan, coba lagi nanti");
        if (onError) onError("Terjadi kesalahan");
      }
    },
    [
      isAuthenticated,
      authHydrated,
      voteHydrated,
      checkHasVoted,
      addVote,
      router,
      redirectToLogin,
      onSuccess,
      onError,
      onUnauthorized,
    ]
  );

  const unvote = useCallback(
    (inovasiId: string) => {
      if (!isAuthenticated) {
        toast.error("Silakan masuk terlebih dahulu");
        return;
      }

      removeVote(inovasiId);
      toast.success("Dukungan dibatalkan");
    },
    [isAuthenticated, removeVote]
  );

  const hasVoted = useCallback(
    (inovasiId: string) => {
      return checkHasVoted(inovasiId);
    },
    [checkHasVoted]
  );

  return {
    vote,
    unvote,
    hasVoted,
    isLoading,
    isAuthenticated,
    voteCount: getVoteCount(),
  };
}