"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { signOutAction } from "~/utils/supabase/actions";

export default function Sidebar() {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    const result = await signOutAction();
    if (result?.error) {
      alert(result.error);
      return;
    }
    router.push("/login");
  }, [router]);

  return (
    <div className="Sidebar bg-g5 flex w-64 flex-col p-4">
      <div className="SidebarTop mb-4">
        <div
          className="InboxButton text-g2 hover:bg-g4 cursor-pointer rounded-md px-3 py-2 text-sm"
          onClick={() => router.push("/inbox")}
        >
          Inbox
        </div>
      </div>
      <div className="ChatHistory flex-1">
        <div className="text-g1 text-sm font-medium">Recent Chats</div>
        {/* Placeholder for chat history */}
        <div className="mt-2 space-y-1">
          <div className="text-g2 hover:bg-g4 cursor-pointer rounded-md px-3 py-2 text-sm">
            New Chat
          </div>
        </div>
      </div>
      <div className="SidebarFooter mt-auto">
        <button
          onClick={handleSignOut}
          className="text-g1 hover:text-p1 w-full cursor-pointer text-left text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
