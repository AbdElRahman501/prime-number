"use client";
import { increaseScore } from "@/lib/actions/product.actions";
import { Store } from "@/types";
import { createWhatsAppLink } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const WhatsAppButton: React.FC<{ store?: Store; phoneNumber: string }> = ({
  store,
  phoneNumber,
}) => {
  if (!phoneNumber || !store) return null;
  return (
    <Link
      target="_blank"
      href={createWhatsAppLink(store.contacts.phoneNumber, phoneNumber)}
      onClick={() => increaseScore(phoneNumber)}
      aria-label={`مشاركة ${phoneNumber} على واتساب`}
      className={`${phoneNumber ? "" : "pointer-events-none"} h-10 w-10 rounded-full bg-background p-2 text-2xl`}
    >
      <Icon icon="ri:whatsapp-line" className="h-6 w-6" />
    </Link>
  );
};

export default WhatsAppButton;
