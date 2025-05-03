"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function ClientToastWrapper({ message }: { message?: string }) {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        toast.success(message);
      }, 100);
    }
  }, [message]);

  return null;
}
