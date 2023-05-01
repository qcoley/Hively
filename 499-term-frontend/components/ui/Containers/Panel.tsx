export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col flex-grow m-2 border-gray-900 border-2 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
