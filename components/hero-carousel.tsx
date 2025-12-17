"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroDrama } from './hero-drama';
import { DramaBook } from '@/lib/types';

interface HeroCarouselProps {
    dramas: DramaBook[];
}

export function HeroCarousel({ dramas }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const validDramas = dramas.filter(d => d && d.bookId && d.coverWap && d.bookName);

    useEffect(() => {
        if (!validDramas || validDramas.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % validDramas.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [validDramas]);

    if (!validDramas || validDramas.length === 0) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <HeroDrama drama={validDramas[currentIndex]} />
            </motion.div>
        </AnimatePresence>
    );
}
