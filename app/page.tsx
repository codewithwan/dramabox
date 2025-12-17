import { fetchForYou, fetchLatest, fetchTrending } from '@/lib/api';
import { DramaSection } from '@/components/drama-section';
import { Header } from '@/components/header';
import { HeroCarousel } from '@/components/hero-carousel';

export default async function Home() {
  const [forYou, latest, trending] = await Promise.all([
    fetchForYou().catch(() => []),
    fetchLatest().catch(() => []),
    fetchTrending().catch(() => []),
  ]);

  const herosDramas = [...trending.slice(0, 3), ...forYou.slice(0, 2)].filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="pb-20">
        <HeroCarousel dramas={herosDramas} />

        <div className="relative z-10 -mt-16 md:-mt-24 lg:-mt-32 space-y-4 md:space-y-8 overflow-x-hidden">
          <DramaSection title="For You" dramas={forYou} horizontal />
          <DramaSection title="Trending Now" dramas={trending} horizontal />
          <DramaSection title="Latest Releases" dramas={latest} />
        </div>
      </main>
    </div>
  );
}
