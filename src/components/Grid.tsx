export default function Grid({ columns }: { columns: number }) {
  return Array.from({ length: columns }).map((_, index) => (
    <div
      key={index}
      style={{
        width: `100%`,
        flex: 1,
        backgroundColor: "lightgray",
        height: "100%",
      }}
    >
      <h3>Grid {index + 1}</h3>
    </div>
  ));
}
