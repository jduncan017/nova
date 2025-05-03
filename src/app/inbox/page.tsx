"use client";

import { Mail, Send, Clock, Users, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { EmailClientComponent } from "~/components/emailClient/emailClient";
import InnerSidebar from "~/components/emailClient/InnerSidebar";
import { createClient } from "~/utils/supabase/client";

export default function EmailPage() {
  const [selectedInbox, setSelectedInbox] = useState("Inbox");
  const [isConnected, setIsConnected] = useState(false);

  // TODO: Replace with real connection check
  const isGmailConnected = false;

  const InnerSidebarButtons = {
    Inbox: {
      icon: Mail,
      action: () => {
        setSelectedInbox("Inbox");
      },
    },
    Sent: {
      icon: Send,
      action: () => {
        setSelectedInbox("Sent");
      },
    },
    Scheduled: {
      icon: Clock,
      action: () => {
        setSelectedInbox("Scheduled");
      },
    },
    Contacts: {
      icon: Users,
      action: () => {
        setSelectedInbox("Contacts");
      },
    },
    Trash: {
      icon: Trash2,
      action: () => {
        setSelectedInbox("Trash");
      },
    },
  };

  useEffect(() => {
    async function checkGmail() {
      const supabase = createClient();
      const userResult = await supabase.auth.getUser();
      const user = userResult?.data?.user;
      if (!user) return;
      const data = await supabase
        .from("gmail_tokens")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setIsConnected(!!data);
    }
    void checkGmail();
  }, []);

  return (
    <div className="InboxContainer flex h-full w-full">
      <InnerSidebar
        Buttons={InnerSidebarButtons}
        selectedButton={selectedInbox}
      />
      <div className="flex flex-1 flex-col">
        {!isConnected && (
          <div className="ConnectGmailButton p-4">
            <a
              href="/api/gmail/auth"
              className="ConnectGmailButton bg-p1 hover:bg-p2 rounded-md px-4 py-2 font-semibold text-white"
            >
              Connect Gmail
            </a>
          </div>
        )}
        <EmailClientComponent />
      </div>
    </div>
  );
}
