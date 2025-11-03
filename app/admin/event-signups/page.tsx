import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';
import { signupService } from '@/src/services/signupService';

export default async function AdminEventSignupsPage() {
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

  // Fetch all signups
  const signups = await signupService.getAllSignups();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Event Signups
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            View all event registrations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">Total Signups</p>
                <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">{signups.length}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Signups Table */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-xs sm:text-sm lg:text-base">
              <thead>
                <tr className="border-b border-base-300">
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Name</th>
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Email</th>
                  <th className="bg-base-100 hidden md:table-cell p-2 sm:p-3 lg:p-4">Mobile</th>
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Event</th>
                  <th className="bg-base-100 hidden lg:table-cell p-2 sm:p-3 lg:p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.length > 0 ? (
                  signups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-base-100">
                      <td className="font-medium p-2 sm:p-3 lg:p-4">
                        {signup.first_name} {signup.last_name}
                      </td>
                      <td className="break-all p-2 sm:p-3 lg:p-4">{signup.email}</td>
                      <td className="hidden md:table-cell p-2 sm:p-3 lg:p-4">{signup.mobile || '-'}</td>
                      <td className="break-words p-2 sm:p-3 lg:p-4">{signup.event_title}</td>
                      <td className="text-xs sm:text-sm text-base-content/60 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                        {signup.created_at ? new Date(signup.created_at).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-base-content/60 text-sm">
                      No signups found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
