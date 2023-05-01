export default function PanelLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`mt-1 ml-2 w-auto font-semibold ${className}`}>
      {children}
    </h2>
  );
}
