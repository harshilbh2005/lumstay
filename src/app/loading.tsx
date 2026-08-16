import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-luma py-20"
      aria-busy="true"
      aria-label="Loading page"
    >
      <Skeleton className="mb-5 h-3 w-28" />
      <Skeleton className="h-16 max-w-2xl" />
      <Skeleton className="mt-5 h-6 max-w-xl" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[4/3] rounded-image" />
        ))}
      </div>
    </main>
  );
}
