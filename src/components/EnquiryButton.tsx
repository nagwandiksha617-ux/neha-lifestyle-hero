import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Activate only after the owner confirms their WhatsApp destination.
export function EnquiryButton() {
  return (
    <Button variant="outline" disabled title="WhatsApp contact awaiting confirmation" className="mt-4 min-h-11 h-auto w-full whitespace-normal border-rose/30 bg-footer-surface px-3 py-3 text-xs text-wine disabled:opacity-80">
      <MessageCircle aria-hidden="true" /> Enquire on WhatsApp
    </Button>
  );
}