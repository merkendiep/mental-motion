import { redirect } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import EventEditClient from "@/src/components/EventEditClient";
import { eventService } from "@/src/services/eventService";
import { signupService } from "@/src/services/signupService";
import AdminLayout from "@/src/components/AdminLayout";

export default async function AdminEventsPage() {
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

  // Fetch all events and signups
  const events = await eventService.getAllEventsIncludingPast();
  const signups = await signupService.getAllSignups();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Manage Events
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            Edit event details with WYSIWYG editor
          </p>
        </div>

        <EventEditClient events={events} signups={signups} />
      </div>
    </AdminLayout>
  );
}
