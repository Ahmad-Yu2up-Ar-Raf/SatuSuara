"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/fragments/shadcn-ui/button";
import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/shadcn-ui/dialog";
import { Input } from "@/components/ui/fragments/shadcn-ui/input";
import { Label } from "@/components/ui/fragments/shadcn-ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/fragments/shadcn-ui/radio-group";
import { HeartHandshake, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";


import { DONATION_PRESETS, donationSchema } from "@/schemas/donation.schema";


// Simplified Inovasi interface for donation dialog
interface DonateInovasi {
  id: string;
  slug: string;
  judul: string;
  ringkasanPendek: string;
  deskripsi: string;
  media: Array<{ kind: "image" | "lottie"; url: string }>;
  pembuat: {
    nama: string;
    organisasi?: string;
    avatarUrl?: string;
  };
  kategori: string;
  tag: string[];
  totalVote: number;
  sumber: Array<{
    type: string;
    title?: string;
    url: string;
    publishedAt?: string;
  }>;
}

interface DonateDialogProps {
  inovasi: DonateInovasi;
  onSuccess?: (transactionId: string) => void;
}

// Format currency in IDR
const formatIDR = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const paymentMethods = [
  {
    id: "bank_transfer",
    title: "Transfer Bank",
    description: "BCA, Mandiri, BNI, BRI",
  },
  {
    id: "ewallet",
    title: "E-Wallet",
    description: "OVO, GoPay, DANA, LinkAja",
  },
  {
    id: "credit_card",
    title: "Kartu Kredit",
    description: "Visa, Mastercard",
  },
] as const;

export function DonateDialog({ inovasi, onSuccess }: DonateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<number>(DONATION_PRESETS[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<string>("bank_transfer");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setCustomAmount(sanitized);
    if (sanitized) {
      setAmount(parseInt(sanitized, 10));
    }
  };

  const handleDonate = async () => {
    try {
      setIsLoading(true);

      // Validate payload
      const payload = {
        amountIdr: amount,
        paymentMethod: method,
        inovasiId: inovasi.id,
      };

      const result = donationSchema.safeParse(payload);

      if (!result.success) {
        toast.error("Pastikan jumlah donasi dan metode pembayaran sudah benar");
        return;
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate mock transaction ID
      const mockTxId = `TX-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      // Handle success
      toast.success("Donasi berhasil! Terima kasih atas dukungan Anda.");

      // Close dialog and redirect
      setIsOpen(false);
      onSuccess?.(mockTxId);
      
      // Redirect to success page with donation type
      router.push(`/sukses?type=donation&tx=${mockTxId}&amount=${amount}`);

    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses donasi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          data-testid="donate-button"
        >
          <HeartHandshake className="w-4 h-4" />
          Donasi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donasi untuk Inovasi</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {inovasi.judul}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Preset Amounts */}
          <div className="grid grid-cols-2 gap-2">
            {DONATION_PRESETS.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant={amount === preset ? "default" : "outline"}
                className="w-full"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
              >
                {formatIDR(preset)}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="grid gap-2 sr-only">
            <Label htmlFor="amount">Jumlah Lainnya</Label>
            <Input
              id="amount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={customAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Rp"
              className="text-lg"
              data-testid="donate-amount-input"
            />
          </div>

          {/* Payment Method */}
          <div className="grid gap-2">
            <Label>Metode Pembayaran</Label>
            <RadioGroup
              value={method}
              onValueChange={setMethod}
              className="grid gap-2"
              data-testid="donate-method"
            >
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={cn(
                    "group flex cursor-target items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-accent/50 transition-colors",
                    method === pm.id && "border-primary bg-primary/5"
                  )}
                  onClick={() => setMethod(pm.id)}
                >
                  <div className="space-y-1">
                    <Label
                      htmlFor={pm.id}
                      className="text-sm font-medium leading-none group-hover:text-primary transition-colors"
                    >
                      {pm.title}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {pm.description}
                    </p>
                  </div>
                  <RadioGroupItem value={pm.id} id={pm.id} className="shrink-0" />
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Batal
          </Button>
          <Button
            onClick={handleDonate}
            disabled={isLoading || !amount || amount < 10000}
            data-testid="donate-submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>Lanjutkan ke Pembayaran</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}