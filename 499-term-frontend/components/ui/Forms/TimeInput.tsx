import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormError from "./FormError";

export default function TimeInput({
  label,
  id,
  register,
  registerOptions,
  min,
  max,
  errors,
}: {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  registerOptions?: any;
  min?: string;
  max?: string;
  errors: FieldErrors<any>;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="time"
          min={min}
          max={max}
          autoComplete="off"
          autoCorrect="off"
          {...register(id, registerOptions)}
          className="block w-full rounded-md border-0 py-1.5 px-4 bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-hPurple-500 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
      </div>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => <FormError>{message}</FormError>}
        />
      )}
    </div>
  );
}
