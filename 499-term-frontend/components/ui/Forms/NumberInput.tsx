import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import FormError from "./FormError";

export default function NumberInput({
  label,
  id,
  min,
  max,
  step,
  placeholder,
  disabled,
  units,
  register,
  registerOptions,
  errors,
}: {
  label: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  units?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  errors: FieldErrors;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="flex mt-2">
        {units && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-gray-500 sm:text-sm">
            {units}
          </span>
        )}
        <input
          type="number"
          id={id}
          {...register(id, registerOptions)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`block w-full ${
            units ? "rounded-r-md" : "rounded-md"
          } border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hPurple-500 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
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
