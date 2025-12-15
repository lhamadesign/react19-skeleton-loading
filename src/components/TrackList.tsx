import type { TrackProps } from "./Track";
import { MOCKED_TRACKLIST } from "../constants";
import { useEffect, useState } from "react";
import Track from "./Track";

const fetchTrackList = async (): Promise<TrackProps[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCKED_TRACKLIST);
    }, 10000);
  });
};

const TrackListSkeleton = () => (
  <div className="flex flex-col w-full gap-2">
    {Array(10)
      .fill(undefined)
      .map((_v, index) => (
        <div key={index} className="flex items-center p-0 m-0 justify-between">
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-zorba animate-pulse"></div>
            <div className="w-[480px] h-10 bg-zorba animate-pulse"></div>
          </div>

          <div className="w-10 h-10 bg-zorba animate-pulse"></div>
        </div>
      ))}
  </div>
);

export default function TrackList() {
  const [trackList, setTrackList] = useState<TrackProps[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTrackList().then((data) => {
      setTrackList(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !trackList) {
    return <TrackListSkeleton />;
  }

  return (
    <div className="flex flex-col">
      {trackList.map((track, index) => (
        <Track key={index} {...track} />
      ))}
    </div>
  );
}
