import { useEffect, useState } from "react";
import TtpdCover from "../assets/ttpd_cover.jpeg";

interface AlbumCover {
  artUrl: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
}

const fetchCover = async (): Promise<AlbumCover> => {
  return new Promise<AlbumCover>((resolve) => {
    setTimeout(() => {
      resolve({
        artUrl: TtpdCover,
        title: "The Tortured Poets Department",
        artist: "Taylor Swift",
        genre: "Pop",
        year: 2024,
      });
    }, 5000);
  });
};

const CoverSkeleton = () => (
  <div className="flex items-center gap-4 w-full">
    <div className="w-cover h-cover bg-zorba animate-pulse rounded-xl"></div>
    <div className="flex flex-col gap-2">
      <div className="w-[480px] h-10 bg-zorba animate-pulse"></div>
      <div className="w-[220px] h-8 bg-zorba animate-pulse"></div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-6 bg-zorba animate-pulse"></div>
        <div className="w-10 h-6 bg-zorba animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function Cover() {
  const [cover, setCover] = useState<AlbumCover | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCover() {
      await fetchCover().then((cover) => {
        setCover(cover);
        setIsLoading(false);
      });
    }

    getCover();
  }, []);

  if (isLoading || !cover) {
    return <CoverSkeleton />;
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={cover.artUrl}
        alt="Album artwork"
        className="w-cover h-cover bg-zorba rounded-xl border border-zorba"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-cararra text-4xl">{cover.title.toUpperCase()}</h3>
        <span className="text-zorba text-2xl">{cover.artist}</span>
        <div className="flex items-center gap-2 text-xl">
          <span className="text-zorba">{cover.genre}</span>
          <span className="text-zorba">{` · `}</span>
          <span className="text-zorba">{cover.year}</span>
        </div>
      </div>
    </div>
  );
}
