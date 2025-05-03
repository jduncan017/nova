import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "~/utils/cn";

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <div className="SearchBarContainer border-g2 flex w-full max-w-[400px] items-center rounded-md border bg-white px-3">
      <Search className="text-g3 h-5 w-5" />
      <input
        type={type}
        className={cn(
          "placeholder:text-g3 flex h-10 w-full bg-transparent px-3 py-2 text-sm focus:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export { SearchBar };
