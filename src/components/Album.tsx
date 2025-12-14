import Cover from "./Cover";

export default function Album() {
  return (
    <div className="flex flex-col gap-6">
      <>
        <Cover />
        <div className="my-6 h-0.5 border-b border-b-zorba"></div>
      </>
    </div>
  );
}
