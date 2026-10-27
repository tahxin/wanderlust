import { Skeleton } from "@/components/ui/skeleton";

export function BookingCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 sm:p-6 rounded-2xl border border-stone-200/80 bg-white shadow-xs">
      <div className="flex items-center gap-5 w-full sm:w-auto">
        <div className="relative h-20 w-24 sm:h-24 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-stone-100">
          <Skeleton className="h-full w-full bg-stone-200/70" />
        </div>
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-44 rounded bg-stone-200/80" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24 rounded bg-stone-200/60" />
            <Skeleton className="h-4 w-28 rounded bg-stone-200/60" />
          </div>
          <Skeleton className="h-4 w-28 rounded bg-stone-200/50" />
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
        <div className="flex sm:flex-col items-center sm:items-end gap-2">
          <Skeleton className="h-6 w-24 rounded-full bg-stone-200/70" />
          <Skeleton className="h-5 w-20 rounded bg-stone-200/80" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24 rounded-md bg-stone-200/80" />
          <Skeleton className="h-9 w-24 rounded-md bg-stone-200/80" />
        </div>
      </div>
    </div>
  );
}

export function MyBookingsSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 md:pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 rounded-lg bg-stone-200/80" />
          <Skeleton className="h-4 w-72 rounded bg-stone-200/60" />
        </div>

        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <Skeleton className="h-8 w-24 rounded-md bg-stone-200/70" />
          <Skeleton className="h-8 w-24 rounded-md bg-stone-200/70" />
          <Skeleton className="h-8 w-24 rounded-md bg-stone-200/70" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
