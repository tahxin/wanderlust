import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 md:pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        {/* Banner card */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full bg-stone-200/80 shrink-0" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <Skeleton className="h-7 w-48 mx-auto sm:mx-0 rounded bg-stone-200/80" />
            <Skeleton className="h-4 w-40 mx-auto sm:mx-0 rounded bg-stone-200/60" />
            <Skeleton className="h-4 w-32 mx-auto sm:mx-0 rounded bg-stone-200/50" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md bg-stone-200/80 shrink-0" />
        </div>

        {/* Travel Stats 4-card grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200/80 bg-white p-5 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 rounded bg-stone-200/60" />
                <Skeleton className="h-8 w-8 rounded-full bg-stone-200/70" />
              </div>
              <Skeleton className="h-7 w-16 rounded bg-stone-200/80" />
            </div>
          ))}
        </div>

        {/* Info Card details */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-44 rounded bg-stone-200/80" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3.5 w-24 rounded bg-stone-200/50" />
                <Skeleton className="h-10 w-full rounded-md bg-stone-200/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
