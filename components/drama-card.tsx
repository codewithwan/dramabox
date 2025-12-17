"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { DramaBook } from '@/lib/types';
import { PlayCircle, Info, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface DramaCardProps {
    drama: DramaBook;
}

export function DramaCard({ drama }: DramaCardProps) {
    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

    if (!drama || !drama.coverWap || !drama.bookId) return null;

    const handleMouseEnter = () => {
        if (showPreview) return;

        const timer = setTimeout(() => {
            setShowPreview(true);
        }, 5000);
        setHoverTimer(timer);
    };

    const handleMouseLeave = () => {
        if (hoverTimer && !showPreview) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
    };

    return (
        <>
            <motion.div
                className="group relative w-full cursor-pointer"
                whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.3 } }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => router.push(`/drama/${drama.bookId}`)}
            >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-card shadow-lg">
                    <img
                        src={drama.coverWap}
                        alt={drama.bookName}
                        className="h-full w-full object-cover rounded-md"
                        loading="lazy"
                    />

                    <motion.div
                        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="font-bold text-white text-xs md:text-sm line-clamp-2 mb-1">
                            {drama.bookName}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
                            <span className="text-green-400 font-semibold">98% Match</span>
                            {drama.chapterCount && <span>• {drama.chapterCount} Episodes</span>}
                            {drama.tags?.[0] && <span>• {drama.tags[0]}</span>}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-3xl bg-zinc-900 text-white border-zinc-800 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">{drama.bookName}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                                <img
                                    src={drama.coverWap}
                                    alt={drama.bookName}
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-20 h-20 text-white opacity-80" />
                                </div>
                                <div className="absolute top-3 right-3">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-full bg-black/50 hover:bg-black/70"
                                        onClick={() => setShowPreview(false)}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    className="flex-1 bg-white text-black hover:bg-white/90 font-bold"
                                    onClick={() => {
                                        setShowPreview(false);
                                        router.push(`/drama/${drama.bookId}`);
                                    }}
                                >
                                    <PlayCircle className="w-5 h-5 mr-2" /> Play
                                </Button>
                                <Button size="icon" variant="ghost" className="rounded-full border border-white/30 hover:bg-white/10">
                                    <Plus className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="rounded-full border border-white/30 hover:bg-white/10">
                                    <ThumbsUp className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="text-green-400 font-bold">98% Match</span>
                                {drama.chapterCount && (
                                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                                        {drama.chapterCount} Episodes
                                    </Badge>
                                )}
                                {drama.tags && drama.tags.slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {drama.introduction && (
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {drama.introduction}
                                </p>
                            )}

                            <div className="text-xs text-gray-400 space-y-1">
                                {drama.playCount && <p>Views: {drama.playCount}</p>}
                            </div>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </>
    );
}
