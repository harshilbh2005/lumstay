"use client";

import * as React from "react";
import {
  ArrowRight,
  ClockCounterClockwise,
  MapPin,
} from "@phosphor-icons/react";

import type { DestinationSuggestion } from "@/features/search/lib/destination-suggestions";
import { cn } from "@/lib/utils";

const listboxId = "hero-destination-suggestions";

function normalize(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function matchesQuery(suggestion: DestinationSuggestion, query: string) {
  const searchableValue = normalize(
    [
      suggestion.name,
      suggestion.country,
      suggestion.region,
      suggestion.character,
    ].join(" "),
  );

  return searchableValue.includes(normalize(query.trim()));
}

export function DestinationCombobox({
  value,
  suggestions,
  hasError,
  onChange,
  onClearError,
  onSelect,
}: {
  value: string;
  suggestions: readonly DestinationSuggestion[];
  hasError: boolean;
  onChange: (value: string) => void;
  onClearError: () => void;
  onSelect: (suggestion: DestinationSuggestion) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasTyped, setHasTyped] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const isFiltering = hasTyped && Boolean(value.trim());
  const filteredSuggestions = React.useMemo(
    () =>
      isFiltering
        ? suggestions.filter((suggestion) => matchesQuery(suggestion, value))
        : suggestions,
    [isFiltering, suggestions, value],
  );
  const recentSuggestions = suggestions.filter(
    (suggestion) => suggestion.group === "recent",
  );
  const popularSuggestions = suggestions.filter(
    (suggestion) => suggestion.group === "popular",
  );
  const visibleSuggestions = isFiltering ? filteredSuggestions : suggestions;
  const activeSuggestion = visibleSuggestions[activeIndex];

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || !activeSuggestion) {
      return;
    }

    document
      .getElementById(`hero-destination-option-${activeSuggestion.slug}`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeSuggestion, isOpen]);

  function chooseSuggestion(suggestion: DestinationSuggestion) {
    onChange(suggestion.searchValue);
    onClearError();
    onSelect(suggestion);
    setHasTyped(false);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Tab") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!visibleSuggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current < visibleSuggestions.length - 1 ? current + 1 : 0,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current > 0 ? current - 1 : visibleSuggestions.length - 1,
      );
      return;
    }

    if (isOpen && event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (isOpen && event.key === "End") {
      event.preventDefault();
      setActiveIndex(visibleSuggestions.length - 1);
      return;
    }

    if (isOpen && event.key === "Enter" && activeSuggestion) {
      event.preventDefault();
      chooseSuggestion(activeSuggestion);
    }
  }

  function renderSuggestion(
    suggestion: DestinationSuggestion,
    index: number,
  ) {
    const isActive = index === activeIndex;
    const Icon =
      suggestion.group === "recent" ? ClockCounterClockwise : MapPin;

    return (
      <button
        key={suggestion.id}
        id={`hero-destination-option-${suggestion.slug}`}
        type="button"
        role="option"
        tabIndex={-1}
        aria-selected={isActive}
        onMouseDown={(event) => event.preventDefault()}
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => chooseSuggestion(suggestion)}
        className={cn(
          "group/option grid min-h-16 w-full grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 px-3 text-left transition-colors duration-200 focus-visible:outline-none",
          isActive
            ? "bg-brand-forest-deep text-brand-paper"
            : "text-foreground hover:bg-brand-linen",
        )}
      >
        <span
          className={cn(
            "flex size-10 items-center justify-center border transition-colors duration-200",
            isActive
              ? "border-white/16 bg-white/8 text-[#d2ab72]"
              : "border-brand-forest-deep/10 bg-brand-linen text-brand-brass",
          )}
        >
          <Icon aria-hidden="true" size={18} weight="duotone" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">
            {suggestion.name}, {suggestion.country}
          </span>
          <span
            className={cn(
              "mt-0.5 block truncate text-xs",
              isActive ? "text-white/66" : "text-muted-foreground",
            )}
          >
            {suggestion.region} · {suggestion.character}
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          size={15}
          className={cn(
            "justify-self-end transition-[opacity,transform] duration-200 ease-luma",
            isActive
              ? "translate-x-0 opacity-100"
              : "-translate-x-1 opacity-0 group-hover/option:translate-x-0 group-hover/option:opacity-65",
          )}
        />
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative min-w-0">
      <label
        htmlFor="hero-destination"
        className={cn(
          "group flex min-h-16 min-w-0 items-center gap-3 rounded-[0.9rem] bg-white px-4 transition-colors duration-200 lg:rounded-l-[1.15rem] lg:rounded-r-none lg:px-5",
          hasError && "ring-2 ring-destructive/70",
        )}
      >
        <MapPin
          aria-hidden="true"
          size={20}
          weight="duotone"
          className="shrink-0 text-brand-brass"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.625rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            Where
          </span>
          <input
            id="hero-destination"
            name="destination"
            role="combobox"
            autoComplete="off"
            spellCheck={false}
            value={value}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-activedescendant={
              isOpen && activeSuggestion
                ? `hero-destination-option-${activeSuggestion.slug}`
                : undefined
            }
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? "hero-destination-help hero-search-message"
                : "hero-destination-help"
            }
            onFocus={(event) => {
              event.currentTarget.select();
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onChange={(event) => {
              onChange(event.target.value);
              onClearError();
              setHasTyped(true);
              setIsOpen(true);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="City, coast or hotel"
            className="mt-0.5 w-full bg-transparent text-[0.9375rem] font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
          />
        </span>
      </label>

      <span id="hero-destination-help" className="sr-only">
        Type to filter destinations. Use the arrow keys to review suggestions,
        Enter to select, or Escape to close.
      </span>

      {isOpen ? (
        <div
          className="absolute bottom-[calc(100%+0.625rem)] left-0 z-30 w-full overflow-hidden rounded-panel border border-white/70 bg-brand-paper text-foreground shadow-float lg:w-[28rem]"
        >
          <div className="max-h-[min(17rem,calc(100svh-14rem))] overscroll-contain overflow-y-auto p-2 sm:max-h-[min(23rem,calc(100svh-8rem))]">
            <div
              id={listboxId}
              role="listbox"
              aria-label="Destination suggestions"
            >
              {isFiltering && filteredSuggestions.length ? (
                <div
                  role="group"
                  aria-labelledby="filtered-destinations-label"
                >
                  <p
                    id="filtered-destinations-label"
                    className="px-3 pt-2 pb-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase"
                  >
                    Suggested destinations
                  </p>
                  <div className="divide-y divide-brand-forest-deep/9">
                    {filteredSuggestions.map((suggestion, index) =>
                      renderSuggestion(suggestion, index),
                    )}
                  </div>
                </div>
              ) : !isFiltering ? (
                <>
                  <div role="group" aria-labelledby="recent-destinations-label">
                    <p
                      id="recent-destinations-label"
                      className="px-3 pt-2 pb-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase"
                    >
                      Recent searches
                    </p>
                    <div className="divide-y divide-brand-forest-deep/9">
                      {recentSuggestions.map((suggestion, index) =>
                        renderSuggestion(suggestion, index),
                      )}
                    </div>
                  </div>
                  <div
                    role="group"
                    aria-labelledby="popular-destinations-label"
                    className="mt-2 border-t border-brand-forest-deep/12 pt-2"
                  >
                    <p
                      id="popular-destinations-label"
                      className="px-3 pt-2 pb-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase"
                    >
                      Popular in the edit
                    </p>
                    <div className="divide-y divide-brand-forest-deep/9">
                      {popularSuggestions.map((suggestion, index) =>
                        renderSuggestion(
                          suggestion,
                          recentSuggestions.length + index,
                        ),
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {isFiltering && !filteredSuggestions.length ? (
              <div className="px-4 py-5" role="status">
                <p className="text-sm font-semibold text-brand-forest-deep">
                  No exact place in our edit yet.
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  You can still search for “{value.trim()}” and explore the
                  current collection.
                </p>
              </div>
            ) : null}
          </div>
          <p className="border-t border-brand-forest-deep/12 px-5 py-3 text-xs text-muted-foreground">
            Seven places, chosen for character—not volume.
          </p>
        </div>
      ) : null}
    </div>
  );
}
