"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container-luma flex min-h-[70vh] max-w-3xl flex-col justify-center py-20">
      <p className="text-eyebrow mb-5 text-destructive">Something went wrong</p>
      <h1 className="text-5xl tracking-[-0.04em]">We couldn’t prepare this stay.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        Your selections are safe. Try loading the page again, or return to explore other stays.
      </p>
      <Button className="mt-8 w-fit" size="lg" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
