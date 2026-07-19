"use client";

import * as React from "react";
import { Heart } from "@phosphor-icons/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

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
    toast(nextSavedState ? "Saved to your Luma list" : "Removed from your Luma list", {
      description: propertyName,
    });
  }

  return (
    <button
      type="button"
      aria-label={`${isSaved ? "Remove" : "Save"} ${propertyName}`}
      aria-pressed={isSaved}
      onClick={handleSave}
      className={cn(
        "group/save flex size-11 items-center justify-center rounded-full border border-white/70 bg-brand-paper/92 text-brand-forest-deep shadow-[0_5px_18px_rgb(16_44_45/0.14)] backdrop-blur-md",
        "transition-[color,background-color,border-color,transform] duration-200 ease-luma hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.96]",
        isSaved && "border-brand-forest bg-brand-forest text-brand-paper",
        className,
      )}
    >
      <Heart
        aria-hidden="true"
        size={19}
        weight={isSaved ? "fill" : "regular"}
        className="transition-transform duration-200 ease-luma group-hover/save:scale-105"
      />
    </button>
  );
}
