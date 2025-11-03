import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';
import { blogService } from '@/src/services/blogService';

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Blog Posts
          </h1>
          <p className="text-base-content/70">
            Manage blog posts from Supabase database
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm">Total Posts</p>
                <p className="text-3xl font-bold text-primary mt-1">{posts.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm">Published</p>
                <p className="text-3xl font-bold text-success mt-1">
                  {posts.filter(p => p.published).length}
                </p>
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
                <p className="text-base-content/60 text-sm">Drafts</p>
                <p className="text-3xl font-bold text-warning mt-1">
                  {posts.filter(p => !p.published).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-base-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base-content">{post.title}</h3>
                      {post.published ? (
                        <span className="badge badge-success badge-sm">Published</span>
                      ) : (
                        <span className="badge badge-warning badge-sm">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-base-content/60 mt-1">
                      By {post.authors.join(', ')} • {post.date}
                    </p>
                    <p className="text-xs text-base-content/40 mt-1">
                      Slug: {post.slug}
                    </p>
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-base-content/60">
                No blog posts found in database
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
