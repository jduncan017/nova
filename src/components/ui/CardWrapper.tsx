import { cn } from "~/utils/cn";
import type { ReactNode } from "react";

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export default function CardWrapper({
  children,
  className,
  title,
  icon,
}: CardWrapperProps) {
  return (
    <div
      className={cn(
        "CardWrapper border-g2 from-s24/40 to-g4/40 shadow-cardWrapper xs:min-w-[350px] xs:px-10 xs:py-8 flex flex-col rounded-md border bg-gradient-to-br p-6 xl:min-w-[400px]",
        className,
      )}
    >
      <div className="flex w-full max-w-[400px] items-center gap-2">
        {icon && <div className="Icon text-p1 mb-1">{icon}</div>}
        {title && (
          <h3 className="Header text-n1 xs:text-2xl w-full text-start text-xl font-semibold">
            {title}
          </h3>
        )}
      </div>
      {children}
    </div>
  );
}
