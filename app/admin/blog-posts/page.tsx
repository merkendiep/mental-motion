import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';
import { blogService } from '@/src/services/blogService';
import BlogEditClient from '@/src/components/BlogEditClient';

export default async function AdminBlogPostsPage() {
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

  // Fetch all blog posts from Supabase
  const posts = await blogService.getAllPostsIncludingUnpublished();

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Manage Blog Posts
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            Edit blog posts with WYSIWYG editor
          </p>
        </div>

        <BlogEditClient posts={posts} />
      </div>
    </AdminLayout>
  );
}
