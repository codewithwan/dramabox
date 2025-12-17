import { Skeleton } from '@/components/ui/skeleton';

export function DramaCardSkeleton() {
    return (
        <div className="w-full space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
        </div>
    );
}

export function DramaPlayerSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
            <Skeleton className="w-full aspect-video rounded-lg" />

            <div className="space-y-3">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-20 w-full" />
            </div>

            <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-video rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh]">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center">
                <div className="w-full px-4 md:px-12 lg:px-16">
                    <div className="max-w-2xl space-y-3 md:space-y-5">
                        <Skeleton className="h-12 md:h-16 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full max-w-xl" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 md:h-12 w-32" />
                            <Skeleton className="h-10 md:h-12 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
