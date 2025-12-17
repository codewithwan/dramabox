import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';
import { DramaBook } from '@/lib/types';

interface HeroDramaProps {
    drama: DramaBook;
}

export function HeroDrama({ drama }: HeroDramaProps) {
    if (!drama) return null;

    return (
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={drama.coverWap}
                    alt={drama.bookName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 flex items-center">
                <div className="w-full px-4 md:px-12 lg:px-16">
                    <div className="max-w-2xl space-y-3 md:space-y-5">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight drop-shadow-lg">
                            {drama.bookName}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground font-medium">
                            <span className="text-green-500 font-bold">98% Match</span>
                            <span>{drama.chapterCount ? `${drama.chapterCount} Episodes` : 'Series'}</span>
                            {drama.tags && drama.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="border border-border px-2 py-0.5 rounded text-xs">{tag}</span>
                            ))}
                        </div>

                        {drama.introduction && (
                            <p className="text-foreground/90 text-sm md:text-base lg:text-lg line-clamp-3 drop-shadow-sm font-normal max-w-xl">
                                {drama.introduction}
                            </p>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                            <Link href={`/drama/${drama.bookId}`}>
                                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold text-base md:text-lg px-6 md:px-8 h-10 md:h-12">
                                    <Play className="mr-2 h-5 w-5 md:h-6 md:w-6 fill-current" /> Play
                                </Button>
                            </Link>
                            <Button size="lg" variant="secondary" className="bg-gray-500/70 text-white hover:bg-gray-500/50 font-semibold text-base md:text-lg px-6 md:px-8 h-10 md:h-12 backdrop-blur-sm">
                                <Info className="mr-2 h-5 w-5 md:h-6 md:w-6" /> More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
