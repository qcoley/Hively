export default function Row({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row ${
        !className?.includes("items-") && "items-center"
      } ${!className && "space-x-1"} ${className}`}
    >
      {children}
    </div>
  );
}
