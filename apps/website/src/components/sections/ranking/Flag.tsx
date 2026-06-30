export function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/20x15/${code}.png`}
      width={20}
      height={15}
      alt=""
      aria-hidden="true"
      className="inline-block shrink-0 object-cover"
      style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
    />
  );
}
