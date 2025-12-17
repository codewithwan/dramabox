export interface DramaBook {
  bookId: string;
  bookName: string;
  coverWap: string;
  introduction?: string;
  tags?: string[];
  playCount?: string;
  chapterCount?: number;
}

export interface VideoQuality {
  quality: number;
  videoPath: string;
  isDefault: number;
}

export interface CdnItem {
  cdnDomain: string;
  videoPathList: VideoQuality[];
}

export interface Episode {
  chapterId: string;
  chapterIndex: number;
  chapterName: string;
  isCharge: number;
  cdnList: CdnItem[];
  chapterImg?: string;
}

export type DramaCategory = "foryou" | "latest" | "trending" | "popular";
