import { UseFormSetValue, UseFormWatch } from "react-hook-form";

export default function NumberSelector({
  label,
  id,
  setValue,
  watch,
  min,
  max,
}: {
  label: string;
  id: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  min?: number;
  max?: number;
}) {
  function increment() {
    //only check against max if max value is provided, same for min
    if (max) {
      if (watch(id) < max) {
        setValue(id, watch(id) + 1);
      }
    } else {
      setValue(id, watch(id) + 1);
    }
  }

  function decrement() {
    if (min) {
      if (watch(id) > min) {
        setValue(id, watch(id) - 1);
      }
    } else {
      setValue(id, watch(id) - 1);
    }
  }

  return (
    <div className="flex flex-row items-center justify-between my-1 w-full">
      <h3 className="font-semibold">{label}</h3>
      <div className="relative w-[100px] h-[40px] bg-transparent overflow-hidden rounded-full">
        <button
          className="inline-block w-[50px] h-full transition ease-in-out duration-200 bg-hPurple-500 border-none text-white text-xl pr-[20px] hover:bg-hPurple-400 active:bg-hPurple-300"
          type="button"
          onClick={decrement}
        >
          &minus;
        </button>
        <span className="absolute font-semibold left-1/2 -ml-[20px] inline-block bg-white h-full w-[40px] text-center leading-10 rounded-full text-base text-hPurple-500 tracking-[-1px]">
          {watch(id)}
        </span>
        <button
          type="button"
          onClick={increment}
          className="inline-block w-[50px] h-full transition ease-in-out duration-200 bg-hPurple-500 border-none text-white text-xl pl-[20px] hover:bg-hPurple-400 active:bg-hPurple-300"
        >
          &#43;
        </button>
      </div>
    </div>
  );
}
