import { forwardRef, useState } from "react";
import { cn } from "~/utils/cn";
import InfoDialogue from "./InfoDialogue";
import type { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label: string;
  error?: FieldError;
  message?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, error, className, message, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          <label htmlFor={name} className={"InputLabel text-n2"}>
            {label}
          </label>
          {message && <InfoDialogue text={message} />}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "FormInput bg-n1 text-g4 placeholder:text-g2 w-full rounded-md p-2",
              error && "ring-1 ring-red-500",
              props.readOnly && "bg-n1/60 text-g2 cursor-not-allowed",
              isPassword && "pr-10",
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-n3 hover:text-g4 focus:ring-p1 absolute top-1/2 right-3 -translate-y-1/2 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" />
              ) : (
                <Eye className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
        {error?.message && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
