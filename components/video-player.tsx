'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    url: string;
    poster?: string;
    autoPlay?: boolean;
}

export function VideoPlayer({ url, poster, autoPlay = false }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && url) {
            videoRef.current.load();
            if (autoPlay) {
                videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
            }
        }
    }, [url, autoPlay]);

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
            <video
                ref={videoRef}
                className="w-full h-full"
                controls
                poster={poster}
                playsInline
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
