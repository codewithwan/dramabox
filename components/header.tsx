'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
            <div className="container flex h-16 items-center px-4 md:px-8">
                <Link href="/" className="mr-8">
                    <span className="text-2xl font-bold text-primary tracking-tighter uppercase">
                        DramaBox
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="text-foreground hover:text-foreground/80 transition-colors">Home</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">TV Shows</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Movies</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">New & Popular</Link>
                </nav>

                <div className="flex flex-1 items-center justify-end">
                    <form onSubmit={handleSearch} className="w-full max-w-[200px] lg:max-w-[300px] relative transition-all focus-within:max-w-[400px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Titles, people, genres"
                            className="w-full bg-secondary/50 border-transparent pl-9 h-9 focus:bg-background transition-all placeholder:text-muted-foreground/50"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </header>
    );
}
