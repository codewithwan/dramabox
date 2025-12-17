import { DramaBook, Episode } from "./types";

const BASE_URL = "https://dramabox.sansekai.my.id/api/dramabox";

export async function fetchForYou(): Promise<DramaBook[]> {
  const res = await fetch(`${BASE_URL}/foryou`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch For You data");
  return res.json();
}

export async function fetchLatest(): Promise<DramaBook[]> {
  const res = await fetch(`${BASE_URL}/latest`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch Latest data");
  return res.json();
}

export async function fetchTrending(): Promise<DramaBook[]> {
  const res = await fetch(`${BASE_URL}/trending`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch Trending data");
  return res.json();
}

export async function searchDramas(query: string): Promise<DramaBook[]> {
  const res = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search dramas");
  return res.json();
}

export async function fetchAllEpisodes(bookId: string): Promise<Episode[]> {
  const res = await fetch(`${BASE_URL}/allepisode?bookId=${bookId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch episodes");
  return res.json();
}
