// app/api/gmail/callback/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "~/utils/supabase/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/gmail/callback`,
);

export async function GET(request: Request) {
  // Get the code and state from the URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // This is the user ID we sent

  if (!code || !state) {
    return NextResponse.redirect("/inbox?message=Invalid OAuth response");
  }

  try {
    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    // Store tokens in your database associated with the user
    const supabase = await createClient();

    // upsert expects an array of objects
    await supabase.from("gmail_tokens").upsert(
      [
        {
          user_id: state,
          access_token: tokens.access_token ?? "",
          refresh_token: tokens.refresh_token ?? "",
          expiry_date: tokens.expiry_date ?? null,
        },
      ],
      { onConflict: "user_id" },
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    return NextResponse.redirect(`${baseUrl}/inbox`);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    return NextResponse.redirect(
      `${baseUrl}/error?message=Failed to authenticate with Gmail`,
    );
  }
}
