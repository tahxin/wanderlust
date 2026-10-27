import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedDestinationsSkeleton() {
  return (
    <section className="bg-sand/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded bg-stone-200/60" />
            <Skeleton className="h-9 w-64 sm:w-80 rounded-lg bg-stone-200/80" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full bg-stone-200/70" />
            <Skeleton className="h-10 w-10 rounded-full bg-stone-200/70" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-stone-200/80 bg-white p-0 shadow-xs"
            >
              <div className="aspect-[16/10] w-full bg-stone-100">
                <Skeleton className="h-full w-full bg-stone-200/70" />
              </div>
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/5 rounded bg-stone-200/70" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-20 rounded bg-stone-200/60" />
                  <Skeleton className="h-4 w-20 rounded bg-stone-200/60" />
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <Skeleton className="h-5 w-16 rounded bg-stone-200/80" />
                  <Skeleton className="h-8 w-24 rounded-md bg-stone-200/70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
