"use client";

import { useState, useEffect } from "react";
import EmailContent from "./emailContent";
import EmailList from "./emailList";
import TopBar from "../ui/topBar";
import { Pencil } from "lucide-react";

export type ParsedEmail = {
  id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
};

export type GmailHeader = { name: string; value: string };
export type GmailBody = { data?: string };
export type GmailPart = {
  mimeType?: string;
  body?: GmailBody;
  parts?: GmailPart[];
};
export type GmailPayload = {
  headers?: GmailHeader[];
  parts?: GmailPart[];
  body?: GmailBody;
};
export type GmailMessage = {
  id: string;
  snippet?: string;
  payload?: GmailPayload;
};

function decodeBase64Url(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if needed
  while (base64.length % 4) base64 += "=";
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function findMimePart(
  parts: GmailPart[] | undefined,
  mimeType: string,
): GmailPart | undefined {
  if (!parts) return undefined;
  for (const part of parts) {
    if (part.mimeType === mimeType && part.body?.data) return part;
    if (part.parts) {
      const found = findMimePart(part.parts, mimeType);
      if (found) return found;
    }
  }
  return undefined;
}

function getBodyFromPayload(payload: GmailPayload): string {
  // Prefer HTML part, fallback to plain text, search recursively
  const htmlPart = findMimePart(payload.parts, "text/html");
  if (htmlPart?.body?.data) return decodeBase64Url(htmlPart.body.data);

  const textPart = findMimePart(payload.parts, "text/plain");
  if (textPart?.body?.data) return decodeBase64Url(textPart.body.data);

  if (payload.body?.data) return decodeBase64Url(payload.body.data);

  return "";
}

function parseGmailMessage(msg: GmailMessage): ParsedEmail {
  const headers = msg.payload?.headers ?? [];
  const getHeader = (name: string) =>
    headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ??
    "";
  const body = msg.payload
    ? getBodyFromPayload(msg.payload)
    : (msg.snippet ?? "");
  return {
    id: msg.id,
    subject: getHeader("Subject"),
    from: getHeader("From"),
    date: getHeader("Date"),
    body,
  };
}

export function EmailClientComponent() {
  const [selectedEmail, setSelectedEmail] = useState<ParsedEmail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("unread");
  const [emails, setEmails] = useState<ParsedEmail[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  async function fetchEmails(pageToken?: string) {
    const res = await fetch(`/api/gmail/list?pageToken=${pageToken ?? ""}`);
    const data = (await res.json()) as {
      emails: GmailMessage[];
      nextPageToken: string | null;
    };
    // Parse the raw Gmail messages into your flat ParsedEmail shape
    const parsed = (data.emails ?? []).map(parseGmailMessage);
    setEmails((prev) => [...prev, ...parsed]);
    setNextPageToken(data.nextPageToken ?? null);
  }

  useEffect(() => {
    void fetchEmails();
  }, []);

  function selectEmail(email: ParsedEmail) {
    setSelectedEmail(email);
  }

  const topBarTitles = [
    {
      name: "Unread",
      icon: "",
      onClick: () => setSelectedTab("unread"),
    },
    {
      name: "Clients",
      icon: "",
      onClick: () => setSelectedTab("clients"),
    },
    {
      name: "Prospects",
      icon: "",
      onClick: () => setSelectedTab("prospects"),
    },
    {
      name: "Non-Business",
      icon: "",
      onClick: () => setSelectedTab("non-business"),
    },
  ];

  const filteredEmails = emails.filter(
    (email) =>
      (email.from ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (email.subject ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (email.body ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="EmailClient bg-g1 relative z-[1] flex h-full w-full">
      <EmailList
        emails={filteredEmails}
        selectEmail={selectEmail}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedEmailID={selectedEmail?.id}
        emailFilter={selectedTab}
      />
      {/* Main content area should fill and scroll properly */}
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar
          titles={topBarTitles}
          addButton={{
            label: "Compose",
            onClick: () => {
              console.log("Compose");
            },
            icon: <Pencil className="h-4 w-4" />,
          }}
        />
        {/* Email content area should fill and scroll */}
        <div className="min-h-0 flex-1">
          {selectedEmail && <EmailContent email={selectedEmail} />}
        </div>
      </div>
    </div>
  );
}
