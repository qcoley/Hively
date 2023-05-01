import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import FormError from "./FormError";

export default function AirQualInput({
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
  units?: React.ReactNode;
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
        <input
          type="number"
          id={id}
          {...register(id, registerOptions)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`block w-full ${
            units ? "rounded-l-md" : "rounded-md"
          } border-0 py-1.5 px-4 bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-hPurple-500 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
        />
        {units && (
          <span className="inline-flex items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-gray-500 sm:text-sm">
            {units}
          </span>
        )}
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
