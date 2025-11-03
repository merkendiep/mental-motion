import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import EventEditClient from '@/src/components/EventEditClient';
import { eventService } from '@/src/services/eventService';
import AdminLayout from '@/src/components/AdminLayout';

export default async function AdminEventsPage() {
  // Check authentication
  const user = await getCurrentUser();
  
  if (!user || !user.email) {
    redirect('/admin/login');
  }

  // Check if user is admin
  const adminStatus = await isAdmin(user.email);
  if (!adminStatus) {
    redirect('/');
  }

  // Fetch all events
  const events = await eventService.getAllEventsIncludingPast();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Manage Events
          </h1>
          <p className="text-base-content/70">
            Select an event to edit its details
          </p>
        </div>
        
        <EventEditClient events={events} />
      </div>
    </AdminLayout>
  );
}
