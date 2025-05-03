"use server";
import { createClient } from "~/utils/supabase/server";
import type { Database } from "~/types/supabase";

// Types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Email = Database["public"]["Tables"]["emails"]["Row"];
export type Preference = Database["public"]["Tables"]["preferences"]["Row"];
export type ActionItem = Database["public"]["Tables"]["action_items"]["Row"];

// Auth: Sign Up
export async function signUpAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message, success: false };
  }
  return { success: true, route: "/chat" };
}

// Auth: Sign In
export async function signInAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

// Get current user (from Supabase Auth)
export async function getUser() {
  const supabase = await createClient();
  const result = await supabase.auth.getUser();
  if (result.error) return { user: null };
  return { user: result.data.user };
}

// Get user profile
export async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return { error: error.message };
  return { profile: data };
}

// Update user profile
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) return { error: error.message };
  return { profile: data };
}

// Get emails for user
export async function getEmails(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("emails")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return { error: error.message };
  return { emails: data };
}

// Insert a new email
export async function insertEmail(email: Omit<Email, "id" | "created_at">) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("emails")
    .insert(email)
    .select()
    .single();
  if (error) return { error: error.message };
  return { email: data };
}

// Get preferences for user
export async function getPreferences(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("preferences")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return { error: error.message };
  return { preferences: data };
}

// Update preferences
export async function updatePreferences(
  userId: string,
  settings: Preference["settings"],
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("preferences")
    .update({ settings })
    .eq("id", userId)
    .select()
    .single();
  if (error) return { error: error.message };
  return { preferences: data };
}

// Get action items for user
export async function getActionItems(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("action_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return { error: error.message };
  return { actionItems: data };
}

// Insert a new action item
export async function insertActionItem(
  item: Omit<ActionItem, "id" | "created_at">,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("action_items")
    .insert(item)
    .select()
    .single();
  if (error) return { error: error.message };
  return { actionItem: data };
}

// Update an action item
export async function updateActionItem(
  id: string,
  updates: Partial<ActionItem>,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("action_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { actionItem: data };
}

// Delete an action item
export async function deleteActionItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("action_items").delete().eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}

// Auth: Sign Out
export async function signOutAction() {
  "use client";
  const { createClient } = await import("~/utils/supabase/client");
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}
