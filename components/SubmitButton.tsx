"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoadingDots from "./loading-dots";

export default function SubmitButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    loadingItem?: React.ReactNode;
  },
) {
  const { pending } = useFormStatus();
  const { loadingItem, children, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={pending || rest.disabled}
      aria-disabled={pending}
    >
      {pending ? (
        loadingItem ? (
          loadingItem
        ) : (
          <div className="h-6 w-6 overflow-hidden text-4xl">
            <LoadingDots />
          </div>
        )
      ) : (
        children
      )}
    </button>
  );
}
