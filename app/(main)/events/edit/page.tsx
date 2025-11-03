import { redirect } from 'next/navigation';

export default async function EventsEditPage() {
  // Redirect to new admin events page
  redirect('/admin/events');
}
