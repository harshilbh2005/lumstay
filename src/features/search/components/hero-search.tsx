"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  CalendarBlank,
  Check,
  MagnifyingGlass,
  MapPin,
  Minus,
  Plus,
  SpinnerGap,
  UsersThree,
} from "@phosphor-icons/react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const mockToday = new Date(2026, 6, 19);
const initialDateRange: DateRange = {
  from: new Date(2026, 8, 18),
  to: new Date(2026, 8, 21),
};

interface GuestState {
  adults: number;
  children: number;
  rooms: number;
}

const initialGuests: GuestState = {
  adults: 2,
  children: 0,
  rooms: 1,
};

function Counter({
  label,
  description,
  value,
  minimum,
  maximum,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-8 py-3">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2" aria-label={`${value} ${label.toLowerCase()}`}>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Remove one ${label.toLowerCase()}`}
          disabled={value <= minimum}
          onClick={() => onChange(value - 1)}
        >
          <Minus aria-hidden="true" />
        </Button>
        <span className="w-6 text-center font-mono text-xs tabular-nums">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Add one ${label.toLowerCase()}`}
          disabled={value >= maximum}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function formatStayDate(date?: Date) {
  return date ? format(date, "dd MMM") : "Choose date";
}

export function HeroSearch() {
  const [destination, setDestination] = React.useState("Udaipur, India");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    initialDateRange,
  );
  const [guests, setGuests] = React.useState(initialGuests);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function updateGuests(key: keyof GuestState, value: number) {
    setGuests((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination.trim()) {
      setError("Tell us where you would like to stay.");
      setStatus("");
      return;
    }

    if (!dateRange?.from || !dateRange.to) {
      setError("Choose both check-in and check-out dates.");
      setStatus("");
      return;
    }

    setError("");
    setStatus("Searching the LumaStay edit…");
    setIsSearching(true);

    timerRef.current = setTimeout(() => {
      setIsSearching(false);
      setStatus(`42 considered stays near ${destination} are ready to explore.`);
    }, 850);
  }

  const guestCount = guests.adults + guests.children;
  const guestSummary = `${guestCount} ${guestCount === 1 ? "guest" : "guests"} · ${guests.rooms} ${guests.rooms === 1 ? "room" : "rooms"}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full min-w-0 max-w-[min(72rem,calc(100vw-2.5rem))]"
    >
      <div className="luma-search-surface grid w-full min-w-0 gap-2 overflow-hidden rounded-[1.25rem] p-2 lg:grid-cols-[1.35fr_1.4fr_0.9fr_auto] lg:gap-px lg:p-px">
        <label
          htmlFor="hero-destination"
          className={cn(
            "group flex min-h-16 min-w-0 items-center gap-3 rounded-[0.9rem] bg-white px-4 transition-colors duration-200 lg:rounded-l-[1.15rem] lg:rounded-r-none lg:px-5",
            error && !destination.trim() && "ring-2 ring-destructive/70",
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
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                if (error) setError("");
              }}
              placeholder="City, coast or hotel"
              aria-invalid={Boolean(error && !destination.trim())}
              aria-describedby={error ? "hero-search-message" : undefined}
              className="mt-0.5 w-full bg-transparent text-[0.9375rem] font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
            />
          </span>
        </label>

        <Popover>
          <PopoverTrigger
            type="button"
            className="flex min-h-16 w-full min-w-0 items-center gap-3 rounded-[0.9rem] bg-white px-4 text-left outline-none transition-colors duration-200 hover:bg-brand-linen focus-visible:ring-2 focus-visible:ring-ring lg:rounded-none lg:px-5"
          >
            <CalendarBlank
              aria-hidden="true"
              size={20}
              weight="duotone"
              className="shrink-0 text-brand-brass"
            />
            <span className="grid min-w-0 flex-1 grid-cols-2 gap-4">
              <span>
                <span className="block text-[0.625rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Check in
                </span>
                <span className="mt-0.5 block text-[0.9375rem] font-semibold text-foreground">
                  {formatStayDate(dateRange?.from)}
                </span>
              </span>
              <span className="border-l border-border pl-4">
                <span className="block text-[0.625rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Check out
                </span>
                <span className="mt-0.5 block text-[0.9375rem] font-semibold text-foreground">
                  {formatStayDate(dateRange?.to)}
                </span>
              </span>
            </span>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={10} className="w-auto rounded-panel p-3">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range);
                if (error) setError("");
              }}
              disabled={{ before: mockToday }}
              numberOfMonths={1}
              className="[--cell-size:--spacing(9)]"
            />
            <div className="flex items-center justify-between border-t border-border px-2 pt-3 text-xs text-muted-foreground">
              <span>Flexible dates are welcome</span>
              {dateRange?.from && dateRange.to ? (
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Check aria-hidden="true" size={14} />
                  {Math.max(
                    1,
                    Math.round(
                      (dateRange.to.getTime() - dateRange.from.getTime()) /
                        (1000 * 60 * 60 * 24),
                    ),
                  )}{" "}
                  nights
                </span>
              ) : null}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger
            type="button"
            className="flex min-h-16 w-full min-w-0 items-center gap-3 rounded-[0.9rem] bg-white px-4 text-left outline-none transition-colors duration-200 hover:bg-brand-linen focus-visible:ring-2 focus-visible:ring-ring lg:rounded-none lg:px-5"
          >
            <UsersThree
              aria-hidden="true"
              size={21}
              weight="duotone"
              className="shrink-0 text-brand-brass"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.625rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Who
              </span>
              <span className="mt-0.5 block truncate text-[0.9375rem] font-semibold text-foreground">
                {guestSummary}
              </span>
            </span>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={10} className="w-[min(22rem,calc(100vw-2.5rem))] px-4 py-2">
            <Counter
              label="Adults"
              description="Ages 13 or above"
              value={guests.adults}
              minimum={1}
              maximum={8}
              onChange={(value) => updateGuests("adults", value)}
            />
            <div className="h-px bg-border" />
            <Counter
              label="Children"
              description="Ages 0–12"
              value={guests.children}
              minimum={0}
              maximum={6}
              onChange={(value) => updateGuests("children", value)}
            />
            <div className="h-px bg-border" />
            <Counter
              label="Rooms"
              description="Up to 8 rooms"
              value={guests.rooms}
              minimum={1}
              maximum={8}
              onChange={(value) => updateGuests("rooms", value)}
            />
          </PopoverContent>
        </Popover>

        <Button
          type="submit"
          disabled={isSearching}
          className="luma-search-button min-h-16 rounded-[0.9rem] px-6 text-[0.9375rem] font-bold lg:m-1 lg:min-w-36 lg:rounded-[0.8rem]"
        >
          {isSearching ? (
            <SpinnerGap aria-hidden="true" className="animate-spin" size={19} />
          ) : (
            <MagnifyingGlass aria-hidden="true" size={19} weight="bold" />
          )}
          {isSearching ? "Searching" : "Find a stay"}
        </Button>
      </div>

      <input type="hidden" name="checkIn" value={dateRange?.from?.toISOString() ?? ""} />
      <input type="hidden" name="checkOut" value={dateRange?.to?.toISOString() ?? ""} />
      <input type="hidden" name="adults" value={guests.adults} />
      <input type="hidden" name="children" value={guests.children} />
      <input type="hidden" name="rooms" value={guests.rooms} />

      <p
        id="hero-search-message"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-5 px-2 text-sm font-medium text-white/82",
          error && "text-[#ffd5cf]",
        )}
      >
        {error || status}
      </p>
    </form>
  );
}
