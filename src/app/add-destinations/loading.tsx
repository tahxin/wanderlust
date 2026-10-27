import { Skeleton } from "@/components/ui/skeleton";

export default function AddDestinationLoading() {
  return (
    <section className="min-h-screen bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 space-y-10">
        <div className="space-y-3">
          <Skeleton className="h-12 w-80 sm:w-96 rounded-lg bg-stone-200/80" />
          <Skeleton className="h-4 w-72 rounded bg-stone-200/60" />
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded bg-stone-200/60" />
              <Skeleton className="h-11 w-full rounded-md bg-stone-200/70" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded bg-stone-200/60" />
              <Skeleton className="h-11 w-full rounded-md bg-stone-200/70" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded bg-stone-200/60" />
              <Skeleton className="h-11 w-full rounded-md bg-stone-200/70" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded bg-stone-200/60" />
              <Skeleton className="h-11 w-full rounded-md bg-stone-200/70" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded bg-stone-200/60" />
            <Skeleton className="h-28 w-full rounded-md bg-stone-200/70" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Skeleton className="h-11 w-32 rounded-md bg-stone-200/80" />
            <Skeleton className="h-11 w-44 rounded-md bg-stone-200/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
