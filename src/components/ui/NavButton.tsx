"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "~/utils/cn";

export default function NavButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className={cn("NavButton w-fit", className)}
    >
      <div className="hover:text-P2 flex w-fit items-center gap-1 text-white">
        <ArrowLeft />
        {children}
      </div>
    </button>
  );
}
