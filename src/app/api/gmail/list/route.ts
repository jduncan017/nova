import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "~/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Get tokens
  const { data: tokenData } = await supabase
    .from("gmail_tokens")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (!tokenData)
    return NextResponse.json({ error: "No Gmail tokens" }, { status: 400 });

  // Set up Gmail client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/gmail/callback`,
  );
  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const url = new URL(request.url);
  const pageToken = url.searchParams.get("pageToken");
  const messagesRes = await gmail.users.messages.list({
    userId: "me",
    maxResults: 20,
    pageToken: pageToken ?? undefined,
  });
  const messages = messagesRes.data.messages ?? [];

  // Fetch message details
  const emailPromises = messages.map(async (msg) => {
    const msgRes = await gmail.users.messages.get({
      userId: "me",
      id: msg.id!,
    });
    return {
      id: msg.id,
      snippet: msgRes.data.snippet,
      payload: msgRes.data.payload,
      // Add more fields as needed
    };
  });
  const emails = await Promise.all(emailPromises);

  return NextResponse.json({
    emails,
    nextPageToken: messagesRes.data.nextPageToken,
  });
}
