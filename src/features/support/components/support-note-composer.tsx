"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle,
  Copy,
  ShieldWarning,
  WarningCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  supportNoteSchema,
  supportTopicLabels,
  supportTopicValues,
  type SupportNoteFormValues,
  type SupportTopic,
} from "@/features/support/lib/support-note-validation";

type PreparedSupportNote = {
  topic: SupportTopic;
  email: string;
  reference: string | null;
  message: string;
};

const fieldClassName =
  "mt-2 h-12 rounded-none border-brand-forest-deep/32 bg-brand-paper px-4 text-base text-brand-forest-deep shadow-none placeholder:text-brand-stone/70 focus-visible:border-brand-brass focus-visible:ring-brand-brass/24 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/24 md:text-base";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-2 text-sm leading-5 font-medium text-destructive"
    >
      <WarningCircle
        aria-hidden="true"
        size={16}
        weight="fill"
        className="mt-0.5 shrink-0"
      />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

function getClipboardText(note: PreparedSupportNote) {
  return [
    `Topic: ${supportTopicLabels[note.topic]}`,
    `Contact email: ${note.email}`,
    `Mock reference: ${note.reference ?? "Not provided"}`,
    "",
    note.message,
    "",
    "Prepared locally in the LumaStay frontend prototype. Not sent.",
  ].join("\n");
}

export function SupportNoteComposer() {
  const preparedNoteRef = useRef<HTMLDivElement>(null);
  const [preparedNote, setPreparedNote] = useState<PreparedSupportNote | null>(
    null,
  );
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportNoteFormValues>({
    resolver: zodResolver(supportNoteSchema),
    defaultValues: {
      topic: undefined,
      email: "",
      reference: "",
      message: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (preparedNote) {
      preparedNoteRef.current?.focus();
    }
  }, [preparedNote]);

  function prepareNote(values: SupportNoteFormValues) {
    const note: PreparedSupportNote = {
      topic: values.topic,
      email: values.email.trim(),
      reference: values.reference.trim()
        ? values.reference.trim().toUpperCase()
        : null,
      message: values.message.trim(),
    };

    setPreparedNote(note);
    setCopyStatus("idle");
    reset({
      ...values,
      email: note.email,
      reference: note.reference ?? "",
      message: note.message,
    });

  }

  function clearPreparedNote() {
    if (!preparedNote) {
      return;
    }

    setPreparedNote(null);
    setCopyStatus("idle");
  }

  async function copyPreparedNote() {
    if (!preparedNote) {
      return;
    }

    try {
      await navigator.clipboard.writeText(getClipboardText(preparedNote));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }

  return (
    <div>
      <div className="grid gap-4 border-y border-brand-forest-deep/18 bg-brand-linen px-5 py-6 sm:grid-cols-[auto_1fr] sm:px-6">
        <ShieldWarning
          aria-hidden="true"
          size={22}
          className="text-brand-brass-dark"
        />
        <div>
          <p className="text-sm font-semibold text-brand-forest-deep">
            No support inbox is connected
          </p>
          <p className="mt-1 text-sm leading-6 text-foreground/68">
            This composer validates and formats a note in your browser. It does
            not send, store, queue, or share the details you enter.
          </p>
        </div>
      </div>

      <form
        className="mt-10"
        noValidate
        onSubmit={handleSubmit(prepareNote)}
        onInput={clearPreparedNote}
      >
        {errorCount > 0 ? (
          <div
            role="alert"
            aria-atomic="true"
            className="mb-8 grid grid-cols-[auto_1fr] gap-3 border-y border-destructive/45 bg-destructive/[0.06] px-4 py-4 text-destructive"
          >
            <WarningCircle
              aria-hidden="true"
              size={20}
              weight="fill"
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-semibold">
                Correct {errorCount} highlighted {errorCount === 1 ? "field" : "fields"}.
              </p>
              <p className="mt-1 text-sm leading-6">
                Focus has moved to the first field that needs attention.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="support-topic"
                className="text-sm font-semibold text-brand-forest-deep"
              >
                Topic
              </label>
              <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                Required
              </span>
            </div>
            <div className="relative mt-2">
              <select
                id="support-topic"
                required
                aria-invalid={errors.topic ? true : undefined}
                aria-describedby={errors.topic ? "support-topic-error" : undefined}
                className="h-12 w-full appearance-none rounded-none border border-brand-forest-deep/32 bg-brand-paper px-4 pr-11 text-base text-brand-forest-deep outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-brand-brass focus-visible:ring-3 focus-visible:ring-brand-brass/24 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/24 motion-reduce:transition-none"
                {...register("topic")}
              >
                <option value="">Choose a topic</option>
                {supportTopicValues.map((topic) => (
                  <option key={topic} value={topic}>
                    {supportTopicLabels[topic]}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-xs text-brand-brass-dark"
              >
                ↓
              </span>
            </div>
            <FieldError id="support-topic-error" message={errors.topic?.message} />
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="support-email"
                className="text-sm font-semibold text-brand-forest-deep"
              >
                Contact email
              </label>
              <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                Required
              </span>
            </div>
            <Input
              id="support-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={254}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "support-email-error" : undefined}
              className={fieldClassName}
              {...register("email")}
            />
            <FieldError id="support-email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label
              htmlFor="support-reference"
              className="text-sm font-semibold text-brand-forest-deep"
            >
              Mock reference
            </label>
            <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
              Optional
            </span>
          </div>
          <Input
            id="support-reference"
            type="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={64}
            placeholder="LUMA-MOCK-… or LUMA-ATTEMPT-…"
            aria-invalid={errors.reference ? true : undefined}
            aria-describedby={`support-reference-help${errors.reference ? " support-reference-error" : ""}`}
            className={fieldClassName}
            {...register("reference")}
          />
          <p
            id="support-reference-help"
            className="mt-2 text-xs leading-5 text-muted-foreground"
          >
            Use only a fixture reference shown in Trips or confirmation. Never
            include a full card number or security code.
          </p>
          <FieldError
            id="support-reference-error"
            message={errors.reference?.message}
          />
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label
              htmlFor="support-message"
              className="text-sm font-semibold text-brand-forest-deep"
            >
              What happened?
            </label>
            <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
              Required
            </span>
          </div>
          <textarea
            id="support-message"
            rows={7}
            required
            maxLength={1200}
            placeholder="Include the page you were on, what you expected, and what appeared instead."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`support-message-help${errors.message ? " support-message-error" : ""}`}
            className="mt-2 min-h-44 w-full resize-y rounded-none border border-brand-forest-deep/32 bg-brand-paper px-4 py-3 text-base leading-7 text-brand-forest-deep outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-brand-stone/70 focus-visible:border-brand-brass focus-visible:ring-3 focus-visible:ring-brand-brass/24 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/24 motion-reduce:transition-none"
            {...register("message")}
          />
          <p
            id="support-message-help"
            className="mt-2 text-xs leading-5 text-muted-foreground"
          >
            24–1,200 characters. Keep sensitive identity and payment details out
            of this prototype.
          </p>
          <FieldError
            id="support-message-error"
            message={errors.message?.message}
          />
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-brand-forest-deep/24 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[31rem] text-sm leading-6 text-foreground/64">
            Preparing creates a readable local summary only. It is not a
            support request and has no response time.
          </p>
          <button
            type="submit"
            className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none"
          >
            Prepare support note
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </button>
        </div>
      </form>

      {preparedNote ? (
        <div
          ref={preparedNoteRef}
          tabIndex={-1}
          aria-labelledby="prepared-note-title"
          className="mt-12 border-y border-brand-brass/48 bg-brand-forest-deep px-5 py-7 text-brand-paper outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-brass sm:px-7 sm:py-8"
        >
          <div className="flex items-start gap-3">
            <CheckCircle
              aria-hidden="true"
              size={22}
              weight="fill"
              className="mt-0.5 shrink-0 text-brand-brass"
            />
            <div>
              <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
                Prepared locally / Not sent
              </p>
              <h3
                id="prepared-note-title"
                className="mt-3 font-display text-3xl leading-none tracking-[-0.035em] sm:text-4xl"
              >
                Your note is ready to copy.
              </h3>
            </div>
          </div>

          <dl className="mt-7 border-t border-brand-paper/18">
            {[
              ["Topic", supportTopicLabels[preparedNote.topic]],
              ["Contact", preparedNote.email],
              ["Reference", preparedNote.reference ?? "Not provided"],
            ].map(([term, detail]) => (
              <div
                key={term}
                className="grid gap-2 border-b border-brand-paper/18 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                  {term}
                </dt>
                <dd className="break-words text-sm leading-6 font-semibold text-brand-paper">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-brand-paper/76">
            {preparedNote.message}
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-brand-paper/18 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-brand-paper/58" aria-live="polite">
              {copyStatus === "copied"
                ? "Copied. No information was sent by LumaStay."
                : copyStatus === "unavailable"
                  ? "Clipboard access is unavailable. Select the note text to copy it manually."
                  : "Copying uses your browser clipboard only."}
            </p>
            <button
              type="button"
              onClick={copyPreparedNote}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-paper bg-brand-paper px-6 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none"
            >
              <Copy aria-hidden="true" size={17} />
              Copy prepared note
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
