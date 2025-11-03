import { supabase } from './supabase';

/**
 * Authentication utilities for admin access
 * NOTE: The isAdmin function should only be used on the server side
 */

/**
 * Check if an email is in the admin list
 * WARNING: This function should ONLY be called from server-side code
 * (API routes, Server Components) to prevent exposing admin emails to the client
 */
export async function isAdmin(email?: string): Promise<boolean> {
  // This should only run on the server
  if (typeof window !== 'undefined') {
    console.error('isAdmin() should not be called from client-side code');
    return false;
  }
  
  // For now, we'll use a simple approach with environment variable
  // In production, this should be stored in Supabase or a proper auth system
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  
  if (!email) {
    return false;
  }
  
  return adminEmails.includes(email.toLowerCase());
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  
  return session;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  
  return user;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}
