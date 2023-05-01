export default function Col({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col ${
        !className?.includes("justify-") && "justify-center"
      } ${!className && "space-y-1"} ${className}`}
    >
      {children}
    </div>
  );
}
