export default function SubPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col m-2 border-gray-900 border-2 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
