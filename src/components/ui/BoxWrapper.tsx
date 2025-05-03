import { cn } from "~/utils/cn";

export default function BoxWrapper({
  children,
  className,
  padding = "lg",
  rounded = "lg",
  variant = "blur",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg";
  variant?: "blur" | "solid";
}) {
  return (
    <div
      className={cn(
        "BoxWrapper border-g3 shadow-boxWrapper max-w-full border",
        variant === "blur" &&
          "from-s13/60 bg-gradient-to-br to-black/60 backdrop-blur-md",
        variant === "solid" && "from-s13 bg-gradient-to-br to-black",
        className,
        padding === "sm" && "xs:p-6 px-2 py-6 lg:p-8",
        padding === "md" && "xs:p-8 px-4 py-8 lg:p-12",
        padding === "lg" && "xs:p-10 px-4 py-8 lg:p-16",
        rounded === "sm" && "xs:rounded-lg lg:rounded-xl",
        rounded === "md" && "xs:rounded-xl lg:rounded-2xl",
        rounded === "lg" && "xs:rounded-2xl lg:rounded-3xl",
      )}
    >
      {children}
    </div>
  );
}
