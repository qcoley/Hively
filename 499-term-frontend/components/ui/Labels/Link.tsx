import Link from "next/link";

export default function HivelyLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`transition ease-in-out delay-50 text-hPurple-500 hover:text-hPurple-300 duration-300 active:text-hPurple-100  ${className}`}
    >
      {children}
    </Link>
  );
}
