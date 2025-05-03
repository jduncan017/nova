import { forwardRef } from "react";
import { cn } from "~/utils/cn";
import { ChevronDown } from "lucide-react";
import type { FieldError } from "react-hook-form";
import InfoDialogue from "./InfoDialogue";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value"> {
  label: string;
  options: SelectOption[];
  error?: FieldError;
  message?: string;
  labelClasses?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    { label, name, options, error, className, message, labelClasses, ...props },
    ref,
  ) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          <label
            htmlFor={name}
            className={cn("InputLabel text-N2", labelClasses)}
          >
            {label}
          </label>
          {message && <InfoDialogue text={message} />}
        </div>
        <div className="SelectWrapper relative">
          <select
            id={name}
            name={name}
            ref={ref}
            className={cn(
              "FormInput bg-N1 text-G4 placeholder:text-N3 w-full appearance-none rounded-md py-2 pr-10 pl-4",
              error && "ring-1 ring-red-500",
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="text-P3 pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
        </div>
        {error?.message && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
