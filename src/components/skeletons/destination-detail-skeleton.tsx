import { Skeleton } from "@/components/ui/skeleton";

export function DestinationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 md:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded bg-stone-200/70" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-4 w-24 rounded bg-stone-200/70" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-4 w-32 rounded bg-stone-200/70" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-10 w-72 sm:w-96 rounded-lg bg-stone-200/80" />
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-28 rounded-full bg-stone-200/70" />
              <Skeleton className="h-6 w-24 rounded-full bg-stone-200/70" />
              <Skeleton className="h-6 w-20 rounded-full bg-stone-200/70" />
              <Skeleton className="h-6 w-32 rounded-full bg-stone-200/70" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24 rounded-md bg-stone-200/80" />
            <Skeleton className="h-10 w-24 rounded-md bg-stone-200/80" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100">
            <Skeleton className="h-full w-full bg-stone-200/80" />
          </div>
          <div className="hidden md:flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-xl overflow-hidden bg-stone-100">
                <Skeleton className="h-full w-full bg-stone-200/70" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-4">
              <Skeleton className="h-6 w-32 rounded bg-stone-200/80" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-stone-200/60" />
                <Skeleton className="h-4 w-full rounded bg-stone-200/60" />
                <Skeleton className="h-4 w-3/4 rounded bg-stone-200/60" />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-4">
              <Skeleton className="h-6 w-36 rounded bg-stone-200/80" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full bg-stone-200/70" />
                    <Skeleton className="h-4 w-44 rounded bg-stone-200/60" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-6">
              <Skeleton className="h-6 w-40 rounded bg-stone-200/80" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-stone-100 p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-16 rounded-md bg-stone-200/80" />
                      <Skeleton className="h-5 w-48 rounded bg-stone-200/70" />
                    </div>
                    <Skeleton className="h-3.5 w-full rounded bg-stone-200/50" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-6">
              <Skeleton className="h-6 w-44 rounded bg-stone-200/80" />
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-stone-100 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full bg-stone-200/70" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-28 rounded bg-stone-200/70" />
                        <Skeleton className="h-3 w-16 rounded bg-stone-200/50" />
                      </div>
                    </div>
                    <Skeleton className="h-3.5 w-full rounded bg-stone-200/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16 rounded bg-stone-200/60" />
                <div className="flex items-baseline gap-2">
                  <Skeleton className="h-8 w-24 rounded bg-stone-200/80" />
                  <Skeleton className="h-4 w-16 rounded bg-stone-200/50" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded bg-stone-200/60" />
                  <Skeleton className="h-10 w-full rounded-md bg-stone-200/70" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded bg-stone-200/60" />
                  <Skeleton className="h-10 w-full rounded-md bg-stone-200/70" />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-100">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24 rounded bg-stone-200/50" />
                  <Skeleton className="h-4 w-16 rounded bg-stone-200/50" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 rounded bg-stone-200/50" />
                  <Skeleton className="h-4 w-12 rounded bg-stone-200/50" />
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100">
                  <Skeleton className="h-5 w-16 rounded bg-stone-200/70" />
                  <Skeleton className="h-5 w-20 rounded bg-stone-200/80" />
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-lg bg-stone-200/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
