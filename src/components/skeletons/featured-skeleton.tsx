import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedDestinationsSkeleton() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-12 w-72 sm:w-80 rounded-lg bg-stone-200/80" />
            <Skeleton className="h-4 w-96 rounded bg-stone-200/60" />
          </div>
          <Skeleton className="h-11 w-44 rounded-[2px] bg-stone-200/70" />
        </div>

        <div className="mt-12 flex gap-8 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-[88vw] shrink-0 sm:w-[500px] md:w-[calc(50%-16px)] md:min-w-[calc(50%-16px)] space-y-4"
            >
              <div className="aspect-[411/231] w-full rounded-[2px] overflow-hidden bg-stone-100">
                <Skeleton className="h-full w-full bg-stone-200/70" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded bg-stone-200/60" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-7 w-48 rounded bg-stone-200/80" />
                  <Skeleton className="h-6 w-24 rounded bg-stone-200/80" />
                </div>
                <Skeleton className="h-4 w-28 rounded bg-stone-200/60" />
                <Skeleton className="h-4 w-24 rounded bg-stone-200/70 pt-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-6">
            <Skeleton className="h-5 w-8 rounded bg-stone-200/70" />
            <div className="h-[1px] flex-1 bg-gray-200" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-full bg-stone-200/70" />
            <Skeleton className="size-11 rounded-full bg-stone-200/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
