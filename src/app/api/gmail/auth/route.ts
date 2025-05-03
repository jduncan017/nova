// app/api/gmail/auth/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "~/utils/supabase/server";

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/gmail/callback`,
);

export async function GET(request: Request) {
  // Get user session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect("/login");
  }

  // Generate authentication URL with Gmail scopes
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.compose",
    ],
    prompt: "consent",
    state: user.id, // Store user ID to associate with tokens later
  });

  return NextResponse.redirect(authUrl);
}
