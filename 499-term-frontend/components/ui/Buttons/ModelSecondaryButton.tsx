import { BeatLoader } from "react-spinners";

export default function ModalSecondaryButton({
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
      className="inline-flex items-center justify-center w-full px-4 py-2 font-medium rounded-md transition ease-in-out delay-50 bg-gray-600 text-white md:text-sm hover:-translate-y-0.5 hover:bg-gray-400 duration-300 active:bg-gray-300 active:text-gray-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:hover:translate-y-0"
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
