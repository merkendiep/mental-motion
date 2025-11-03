import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';
import Link from 'next/link';
import { eventService } from '@/src/services/eventService';

export default async function AdminDashboardPage() {
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

  // Fetch some stats for the dashboard
  const events = await eventService.getAllEventsIncludingPast();
  const upcomingEvents = await eventService.getUpcomingEvents();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-base-content/70">Welcome to the Mental Motion admin panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm">Total Events</p>
                <p className="text-3xl font-bold text-primary mt-1">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm">Upcoming Events</p>
                <p className="text-3xl font-bold text-success mt-1">{upcomingEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm">Past Events</p>
                <p className="text-3xl font-bold text-base-content mt-1">{events.length - upcomingEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-base-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/events"
              className="btn btn-lg bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 flex flex-col items-center gap-2 h-auto py-6"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Manage Events</span>
            </Link>

            <Link
              href="/admin/event-signups"
              className="btn btn-lg bg-success/10 hover:bg-success/20 text-success border-success/20 flex flex-col items-center gap-2 h-auto py-6"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>View Signups</span>
            </Link>

            <Link
              href="/admin/blog-posts"
              className="btn btn-lg bg-accent/10 hover:bg-accent/20 text-accent border-accent/20 flex flex-col items-center gap-2 h-auto py-6"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Manage Blog Posts</span>
            </Link>

            <Link
              href="/"
              className="btn btn-lg bg-base-200 hover:bg-base-300 text-base-content flex flex-col items-center gap-2 h-auto py-6"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>View Website</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-200"
                >
                  <div>
                    <p className="font-semibold text-base-content">{event.title}</p>
                    <p className="text-sm text-base-content/60">
                      {event.date} • {event.time} • {event.location}
                    </p>
                  </div>
                  <Link
                    href={`/admin/events?edit=${event.id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content/60 text-center py-8">No upcoming events</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
