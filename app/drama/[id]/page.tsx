import { fetchAllEpisodes, fetchForYou, fetchLatest, fetchTrending } from '@/lib/api';
import { DramaPlayerUI } from '@/components/drama-player-ui';
import { Header } from '@/components/header';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { DramaPlayerSkeleton } from '@/components/skeletons';

interface DramaPageProps {
    params: Promise<{ id: string }>;
}

async function DramaContent({ id }: { id: string }) {
    try {
        const episodes = await fetchAllEpisodes(id);

        if (!episodes || episodes.length === 0) {
            return notFound();
        }

        let dramaInfo = null;
        try {
            const [forYou, latest, trending] = await Promise.all([
                fetchForYou().catch(() => []),
                fetchLatest().catch(() => []),
                fetchTrending().catch(() => []),
            ]);

            const allDramas = [...forYou, ...latest, ...trending];
            dramaInfo = allDramas.find(d => d.bookId === id);
        } catch (e) {
            console.log('Could not fetch drama details');
        }

        return (
            <DramaPlayerUI
                bookId={id}
                bookName={dramaInfo?.bookName}
                introduction={dramaInfo?.introduction}
                episodes={episodes}
            />
        );
    } catch (error) {
        console.error(error);
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-red-500">Failed to load episodes. Please try again later.</p>
            </div>
        );
    }
}

export default async function DramaPage({ params }: DramaPageProps) {
    const { id } = await params;

    if (!id) return notFound();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Header />
            <main className="pb-20">
                <Suspense fallback={<DramaPlayerSkeleton />}>
                    <DramaContent id={id} />
                </Suspense>
            </main>
        </div>
    );
}
