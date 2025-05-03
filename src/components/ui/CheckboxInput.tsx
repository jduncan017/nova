import { forwardRef } from "react";
import type { ReactNode } from "react";
import { cn } from "~/utils/cn";
import type { FieldError } from "react-hook-form";

interface CheckboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  error?: FieldError;
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id={name}
            name={name}
            ref={ref}
            className={cn("bg-n1 accent-p1 mt-[3px] h-4 w-4")}
            {...props}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor={name} className={cn("text-n2")}>
              {label}
            </label>
            {error?.message && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
