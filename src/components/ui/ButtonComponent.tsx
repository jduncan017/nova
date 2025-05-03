import { cn } from "~/utils/cn";

type ButtonComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: "primary" | "secondary" | "remove";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ButtonComponent({
  className,
  children,
  type = "button",
  onClick,
  disabled = false,
  style = "primary",
  size = "md",
  ...props
}: ButtonComponentProps) {
  const styles: Record<string, string> = {
    primary: "hover:bg-p2 hover:text-g4 bg-p3 text-white",
    secondary: "hover:bg-g1 bg-n1 text-g4 hover:text-n1",
    remove:
      "border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2",
    md: "px-5 py-3",
    lg: "px-6 py-4",
  };

  return (
    <button
      className={cn(
        "ButtonComponent flex h-fit w-fit items-center justify-center gap-2 rounded-sm transition-colors duration-300 hover:cursor-pointer",
        !disabled && styles[style],
        disabled && "bg-n3 text-n1 hover:bg-n3 cursor-not-allowed",
        sizes[size],
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
