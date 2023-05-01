import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function SearchInput({
  id,
  query,
  setQuery,
}: {
  id: string;
  query: string;
  setQuery: any;
}) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-300"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name={id}
          id={id}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          className="block w-full py-3 pl-10 text-white bg-transparent border-y-2 border-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-hPurple-500 sm:text-sm sm:leading-6"
          placeholder="Search"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              let input = document.getElementById(id) as HTMLInputElement;
              input.value = "";
              setQuery("");
            }}
            className="absolute right-0 inset-y-0 flex flex-none items-center justify-center p-2 rounded-full "
          >
            <XMarkIcon
              className="h-6 w-6 rounded-full p-0.5 bg-gray-600  text-gray-800 hover:bg-gray-500 active:bg-gray-400"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
}
