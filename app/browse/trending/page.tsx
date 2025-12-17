import { fetchTrending } from '@/lib/api';
import { Header } from '@/components/header';
import { DramaCard } from '@/components/drama-card';
import { Suspense } from 'react';
import { DramaCardSkeleton } from '@/components/skeletons';

async function TrendingContent() {
    const dramas = await fetchTrending().catch(() => []);
    const validDramas = dramas.filter(d => d && d.bookId && d.coverWap && d.bookName);

    if (!validDramas || validDramas.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">No trending dramas found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {validDramas.map((drama) => (
                <DramaCard key={drama.bookId} drama={drama} />
            ))}
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <DramaCardSkeleton key={i} />
            ))}
        </div>
    );
}

export default function TrendingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 md:px-12 py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Trending Now</h1>
                <Suspense fallback={<LoadingSkeleton />}>
                    <TrendingContent />
                </Suspense>
            </main>
        </div>
    );
}
