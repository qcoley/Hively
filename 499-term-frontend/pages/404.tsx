import Link from "next/link";
import HivelyLink from "../components/ui/Labels/Link";

export default function Custom404() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center text-xl font-semibold">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-hivelyPurple to-hivelyBlue">
        404
      </h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <p>
        Please check your URL and try again, or{" "}
        <HivelyLink href="/">return to the dashboard</HivelyLink>.
      </p>
    </div>
  );
}
