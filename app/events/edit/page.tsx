import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import EventEditClient from '@/src/components/EventEditClient';
import { eventService } from '@/src/services/eventService';

export default async function EventsEditPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Edit Events
          </h1>
          <p className="text-base-content/70">
            Select an event to edit its details
          </p>
        </div>
        
        <EventEditClient events={events} userEmail={user.email} />
      </div>
    </div>
  );
}
