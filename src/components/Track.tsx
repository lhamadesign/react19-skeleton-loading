export interface TrackProps {
  order: number;
  title: string;
  duration: string;
}

export default function Track(props: TrackProps) {
  const { order, title, duration } = props;

  return (
    <div className="flex items-cemter justify-between w-full py-3 px-0 hover:bg-black/10">
      <div className="flex gap-6">
        <span className="text-xl text-zorba flex items-center w-4">
          {order}
        </span>
        <h3 className="text-2xl text-zorba">{title}</h3>
      </div>

      <span className="text-zorba text-xl">{duration}</span>
    </div>
  );
}
