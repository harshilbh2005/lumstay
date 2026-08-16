import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-luma flex min-h-[70vh] max-w-3xl flex-col justify-center py-20"
    >
      <p className="text-eyebrow mb-5 text-brand-brass-dark">404 · Room not found</p>
      <h1 className="text-5xl tracking-[-0.04em]">This stay has slipped away.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        It may no longer be available, but there are more considered places waiting to be found.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8 w-fit`}>
        Return home
      </Link>
    </main>
  );
}
