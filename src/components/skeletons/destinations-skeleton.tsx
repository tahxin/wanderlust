import { Skeleton } from "@/components/ui/skeleton";

export function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-xs">
      <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
        <Skeleton className="h-full w-full bg-stone-200/70" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-16 rounded-full bg-white/80" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/5 rounded bg-stone-200/70" />
          <Skeleton className="h-4 w-12 rounded bg-stone-200/70" />
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Skeleton className="h-4 w-24 rounded bg-stone-200/70" />
          <Skeleton className="h-4 w-20 rounded bg-stone-200/70" />
        </div>

        <Skeleton className="h-3.5 w-full rounded bg-stone-200/50" />
        <Skeleton className="h-3.5 w-4/5 rounded bg-stone-200/50" />

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-3 w-10 rounded bg-stone-200/60" />
            <Skeleton className="h-5 w-16 rounded bg-stone-200/80" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md bg-stone-200/80" />
        </div>
      </div>
    </div>
  );
}

export function DestinationsCatalogSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 md:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Skeleton className="h-10 w-72 mx-auto rounded-lg bg-stone-200/80" />
          <Skeleton className="h-4 w-96 mx-auto rounded bg-stone-200/60" />
        </div>

        <div className="mb-8 rounded-2xl border border-stone-200/80 bg-white p-4 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {[72, 84, 96, 88, 104, 92, 80].map((width, idx) => (
              <Skeleton
                key={idx}
                className="h-9 rounded-full bg-stone-200/70"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>

          <div className="h-px bg-stone-100" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-11 rounded-lg bg-stone-200/70" />
            <Skeleton className="h-11 rounded-lg bg-stone-200/70" />
            <Skeleton className="h-11 rounded-lg bg-stone-200/70" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <DestinationCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
