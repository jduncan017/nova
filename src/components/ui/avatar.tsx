"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "~/utils/cn";

interface AvatarProps {
  src?: string;
  fullName: string;
  className?: string;
}

export default function Avatar({
  src,
  fullName,
  className,
  ...props
}: AvatarProps) {
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "Avatar bg-p2 relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-medium tracking-wider text-white",
        className,
      )}
      {...props}
    >
      {src ? (
        <Image src={src} alt={`${fullName}'s Avatar`} width={48} height={48} />
      ) : (
        <p>{initials}</p>
      )}
    </div>
  );
}
