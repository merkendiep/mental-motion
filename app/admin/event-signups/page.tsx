import { redirect } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import { signupService } from "@/src/services/signupService";
import { eventService } from "@/src/services/eventService";
import EventSignupsClient from "./EventSignupsClient";

export default async function AdminEventSignupsPage() {
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

  // Fetch all signups and events
  const signups = await signupService.getAllSignups();
  const events = await eventService.getAllEvents(true); // Include past events

  return (
    <EventSignupsClient
      signups={signups}
      events={events}
      userEmail={user.email}
    />
  );
}
