import { BeatLoader } from "react-spinners";

export default function SecondaryButton({
  children,
  onClick,
  disabled,
  type,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled || false}
      className="flex items-center justify-center w-full px-6 py-3 font-medium rounded-md transition ease-in-out delay-50 border-gray-800 border-2 bg-transparent hover:-translate-y-0.5 hover:bg-gray-600 duration-300 active:bg-gray-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:translate-y-0"
    >
      {loading ? (
        <div className="flex h-5 items-center justify-center">
          <BeatLoader loading={true} size={12} color={"#d1d5db"} />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
