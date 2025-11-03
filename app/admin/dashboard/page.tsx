import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';
import Link from 'next/link';
import { eventService } from '@/src/services/eventService';
import { blogService } from '@/src/services/blogService';
import { newsletterService } from '@/src/services/newsletterService';

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

  // Fetch stats for the dashboard
  const events = await eventService.getAllEventsIncludingPast();
  const upcomingEvents = await eventService.getUpcomingEvents();
  const blogPosts = await blogService.getAllPostsIncludingUnpublished();
  const newsletters = await newsletterService.getAllSubscriptions();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-sm lg:text-base text-base-content/70">Welcome to the Mental Motion admin panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-3 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">Total Events</p>
                <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">{events.length}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-3 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">Blog Posts</p>
                <p className="text-2xl lg:text-3xl font-bold text-success mt-1">{blogPosts.length}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-success/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-3 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">Newsletter Subs</p>
                <p className="text-2xl lg:text-3xl font-bold text-info mt-1">{newsletters.length}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-info/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-3 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">Upcoming Events</p>
                <p className="text-2xl lg:text-3xl font-bold text-warning mt-1">{upcomingEvents.length}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-bold text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            <Link
              href="/admin/events"
              className="btn btn-sm lg:btn-lg bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 flex flex-col items-center gap-2 h-auto py-4 lg:py-6"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-xs lg:text-base">Manage Events</span>
            </Link>

            <Link
              href="/admin/event-signups"
              className="btn btn-sm lg:btn-lg bg-success/10 hover:bg-success/20 text-success border-success/20 flex flex-col items-center gap-2 h-auto py-4 lg:py-6"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs lg:text-base">View Signups</span>
            </Link>

            <Link
              href="/admin/blog-posts"
              className="btn btn-sm lg:btn-lg bg-accent/10 hover:bg-accent/20 text-accent border-accent/20 flex flex-col items-center gap-2 h-auto py-4 lg:py-6"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="text-xs lg:text-base">Blog Posts</span>
            </Link>

            <Link
              href="/admin/newsletter-signups"
              className="btn btn-sm lg:btn-lg bg-info/10 hover:bg-info/20 text-info border-info/20 flex flex-col items-center gap-2 h-auto py-4 lg:py-6"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
              <span className="text-xs lg:text-base">Newsletter</span>
            </Link>

            <Link
              href="/"
              className="btn btn-sm lg:btn-lg bg-base-200 hover:bg-base-300 text-base-content flex flex-col items-center gap-2 h-auto py-4 lg:py-6"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs lg:text-base">View Website</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-bold text-primary mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-base-100 rounded-lg border border-base-200 gap-2"
                >
                  <div>
                    <p className="font-semibold text-base-content text-sm lg:text-base">{event.title}</p>
                    <p className="text-xs lg:text-sm text-base-content/60">
                      {event.date} • {event.time} • {event.location}
                    </p>
                  </div>
                  <Link
                    href={`/admin/events?edit=${event.id}`}
                    className="btn btn-xs lg:btn-sm btn-ghost w-full sm:w-auto"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content/60 text-center py-8 text-sm lg:text-base">No upcoming events</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
