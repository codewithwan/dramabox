
import { searchDramas } from '@/lib/api';
import { DramaSection } from '@/components/drama-section';
import { Header } from '@/components/header';

interface SearchPageProps {
    searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q: query } = await searchParams;
    const results = query ? await searchDramas(query) : [];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Header />
            <main className="container mx-auto pb-10">
                <div className="px-4 py-6">
                    <h1 className="text-3xl font-bold mb-2">Search Results</h1>
                    <p className="text-muted-foreground mb-8">
                        Showing results for "{query}"
                    </p>
                </div>
                {results.length > 0 ? (
                    <DramaSection title="" dramas={results} />
                ) : (
                    <div className="px-4 text-center py-20 text-muted-foreground">
                        No dramas found matching your search.
                    </div>
                )}
            </main>
        </div>
    );
}
