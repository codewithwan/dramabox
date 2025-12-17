'use client';

import { useState } from 'react';
import { Episode } from '@/lib/types';
import { VideoPlayer } from '@/components/video-player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DramaPlayerUIProps {
    bookId: string;
    bookName?: string;
    introduction?: string;
    episodes: Episode[];
}

export function DramaPlayerUI({ bookId, bookName, introduction, episodes }: DramaPlayerUIProps) {
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

    const currentEpisode = episodes[currentEpisodeIndex];

    const getVideoUrl = (ep: Episode): string => {
        if (!ep || !ep.cdnList || ep.cdnList.length === 0) return '';
        const cdn = ep.cdnList.find(c => c.videoPathList.some(v => v.isDefault)) || ep.cdnList[0];
        if (!cdn) return '';

        const qualities = cdn.videoPathList;
        const defaultQ = qualities.find(q => q.isDefault === 1);
        const highQ = qualities.find(q => q.quality === 720) || qualities.find(q => q.quality === 1080);

        return (defaultQ || highQ || qualities[0])?.videoPath || '';
    };

    const videoUrl = getVideoUrl(currentEpisode);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
            <div className="w-full">
                <VideoPlayer url={videoUrl} autoPlay={true} />
            </div>

            <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                            {bookName || 'Drama'}
                        </h1>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="font-medium">
                                {currentEpisode?.chapterName || `Episode ${currentEpisodeIndex + 1}`}
                            </span>
                            <span>•</span>
                            <span>Episode {currentEpisodeIndex + 1} of {episodes.length}</span>
                            {currentEpisode?.isCharge === 1 && (
                                <>
                                    <span>•</span>
                                    <Badge variant="destructive" className="uppercase tracking-widest text-[10px]">Premium</Badge>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {introduction && (
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {introduction}
                    </p>
                )}
            </div>

            <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Episodes
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                    {episodes.map((ep, index) => {
                        const isActive = index === currentEpisodeIndex;
                        const isLocked = ep.isCharge === 1;

                        return (
                            <button
                                key={ep.chapterId}
                                onClick={() => setCurrentEpisodeIndex(index)}
                                className={cn(
                                    "relative aspect-video rounded-md overflow-hidden border-2 transition-all group",
                                    isActive
                                        ? "border-primary bg-primary/10"
                                        : "border-border hover:border-primary/50 bg-card hover:bg-accent"
                                )}
                            >
                                {ep.chapterImg ? (
                                    <img
                                        src={ep.chapterImg}
                                        alt={ep.chapterName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                                        <span className={cn(
                                            "text-xs font-bold",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )}>
                                            {index + 1}
                                        </span>
                                    </div>
                                )}

                                <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                                    {index + 1}
                                </div>

                                {isLocked && (
                                    <div className="absolute top-1 right-1">
                                        <Lock className="w-3 h-3 text-yellow-500" />
                                    </div>
                                )}

                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <Play className="w-6 h-6 text-white fill-white" />
                                    </div>
                                )}

                                <div className="absolute bottom-0 inset-x-0 bg-black/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[9px] text-white truncate font-medium">
                                        {ep.chapterName}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
