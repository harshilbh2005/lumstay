"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

function SaveConfirmation({
  propertyName,
  isSaved,
  toastId,
}: {
  propertyName: string;
  isSaved: boolean;
  toastId: number | string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="luma-save-notice relative grid min-h-[4.75rem] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[1.1rem] border border-white/14 px-3.5 py-3 text-brand-paper"
    >
      <motion.span
        initial={{ scale: 0.72, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.04 }}
        className={cn(
          "flex size-11 items-center justify-center rounded-full border shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]",
          isSaved
            ? "border-brand-brass/48 bg-brand-brass/16 text-[#e2bf88]"
            : "border-white/14 bg-white/8 text-brand-paper/72",
        )}
      >
        <Heart aria-hidden="true" size={19} weight={isSaved ? "fill" : "regular"} />
      </motion.span>

      <span className="min-w-0">
        <span className="block font-mono text-[0.5625rem] tracking-[0.14em] text-brand-paper/56 uppercase">
          {isSaved ? "Added to your Luma list" : "Removed from your Luma list"}
        </span>
        <span className="mt-1 block truncate text-[0.9375rem] leading-none font-semibold tracking-[0.01em]">
          {propertyName}
        </span>
      </span>

      {isSaved ? (
        <Link
          href="/saved"
          aria-label="View saved stays"
          onClick={() => toast.dismiss(toastId)}
          className="group/notice flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3.5 text-xs font-semibold text-brand-paper/88 transition-[background-color,border-color,color] duration-200 hover:border-brand-brass/48 hover:bg-white/12 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass"
        >
          <span className="hidden sm:inline">View saved</span>
          <ArrowRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 ease-luma group-hover/notice:translate-x-0.5"
          />
        </Link>
      ) : (
        <span className="px-2 font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/42 uppercase">
          Updated
        </span>
      )}

      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3.2, ease: "linear" }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-brass"
      />
    </motion.div>
  );
}

export function SaveStayButton({
  propertyName,
  className,
}: {
  propertyName: string;
  className?: string;
}) {
  const [isSaved, setIsSaved] = React.useState(false);

  function handleSave() {
    const nextSavedState = !isSaved;

    setIsSaved(nextSavedState);
    toast.custom(
      (toastId) => (
        <SaveConfirmation
          propertyName={propertyName}
          isSaved={nextSavedState}
          toastId={toastId}
        />
      ),
      {
        id: `saved-stay-${propertyName}`,
        duration: 3200,
        position: "top-center",
        unstyled: true,
      },
    );
  }

  return (
    <button
      type="button"
      aria-label={`${isSaved ? "Remove" : "Save"} ${propertyName}`}
      aria-pressed={isSaved}
      onClick={handleSave}
      className={cn(
        "group/save flex size-11 items-center justify-center rounded-full border shadow-[0_6px_20px_rgb(8_30_31/0.22),inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-md",
        "transition-[color,background-color,border-color,transform] duration-200 ease-luma hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-0 active:scale-[0.96]",
        isSaved
          ? "border-brand-brass/72 bg-brand-forest-deep text-[#ddb87e] hover:border-brand-brass hover:bg-[#0b2728]"
          : "border-white/34 bg-brand-forest-deep/75 text-brand-paper hover:border-brand-brass/68 hover:bg-brand-forest-deep",
        className,
      )}
    >
      <Heart
        aria-hidden="true"
        size={19}
        weight={isSaved ? "fill" : "regular"}
        className="transition-transform duration-200 ease-luma group-hover/save:scale-105 group-hover/save:-rotate-6"
      />
    </button>
  );
}
