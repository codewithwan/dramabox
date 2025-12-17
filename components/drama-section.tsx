"use client"

import { DramaBook } from '@/lib/types';
import { DramaCard } from './drama-card';
import { Github } from 'lucide-react';
import Link from 'next/link';

interface DramaSectionProps {
    title: string;
    dramas: DramaBook[];
    horizontal?: boolean;
}

const GithubCard = () => (
    <Link href="https://github.com/codewithwan/dramabox" target="_blank" className="block h-full">
        <div className="w-full h-full aspect-[2/3] bg-zinc-900 border border-zinc-800 rounded-md flex flex-col items-center justify-center p-4 text-center hover:bg-zinc-800 transition-colors cursor-pointer group">
            <Github className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2 text-sm">Open Source</h3>
            <p className="text-xs text-zinc-400">
                Star this project on GitHub!
            </p>
        </div>
    </Link>
);

export function DramaSection({ title, dramas, horizontal = false }: DramaSectionProps) {
    const validDramas = dramas?.filter(d =>
        d &&
        d.bookId &&
        d.coverWap &&
        d.bookName &&
        d.coverWap.startsWith('http')
    ) || [];

    if (!validDramas || validDramas.length === 0) return null;

    return (
        <section className="py-4 md:py-6 space-y-3 md:space-y-4">
            <h2 className="px-4 md:px-12 text-xl md:text-2xl font-semibold tracking-wide text-foreground">
                {title}
            </h2>

            {horizontal ? (
                <div className="relative py-8">
                    <div className="overflow-x-auto overflow-y-visible scrollbar-hide">
                        <div className="flex space-x-2 md:space-x-4 px-4 md:px-12 pb-4">
                            {validDramas.map((drama) => (
                                <div key={drama.bookId} className="w-[140px] md:w-[180px] lg:w-[200px] shrink-0">
                                    <DramaCard drama={drama} />
                                </div>
                            ))}
                            <div className="w-[140px] md:w-[180px] lg:w-[200px] shrink-0">
                                <GithubCard />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 px-4 md:px-12 py-8">
                    {validDramas.map((drama) => (
                        <DramaCard key={drama.bookId} drama={drama} />
                    ))}
                </div>
            )}
        </section>
    );
}
