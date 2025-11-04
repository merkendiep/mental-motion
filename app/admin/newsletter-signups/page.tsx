import { redirect } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import {
  newsletterService,
  NewsletterSubscription,
} from "@/src/services/newsletterService";
import NewsletterSignupsClient from "./NewsletterSignupsClient";

export default async function AdminNewsletterSignupsPage() {
  // Check authentication
  const user = await getCurrentUser();

  if (!user || !user.email) {
    redirect("/admin/login");
  }

  // Check if user is admin
  const adminStatus = await isAdmin(user.email);
  if (!adminStatus) {
    redirect("/");
  }

  // Fetch all newsletter subscriptions
  let subscriptions: NewsletterSubscription[] = [];
  let errorMessage: string | null = null;

  try {
    subscriptions = await newsletterService.getAllSubscriptions();
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error);
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <NewsletterSignupsClient
      userEmail={user.email}
      subscriptions={subscriptions}
      errorMessage={errorMessage}
    />
  );
}
