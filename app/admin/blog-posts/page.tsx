import { redirect } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/src/lib/auth';
import AdminLayout from '@/src/components/AdminLayout';

// Since blog posts are currently hardcoded in the blog page,
// we'll display them as read-only for now
const posts = [
  {
    title: "Stabiele basis voor jongvolwassenen in Utrecht",
    slug: "stabiele-basis-voor-jongvolwassenen-in-utrecht",
    authors: ["Marik"],
    date: "21-10-2025",
  },
  {
    title: "One year in the making",
    slug: "een-jaar-in-de-maak",
    authors: ["Sofia"],
    date: "21-09-2025",
  },
  {
    title: "De tegelwijsheden hangen!",
    slug: "de-tegelwijsheden-hangen",
    authors: ["Marik", "Sofia"],
    date: "18-10-2024",
  },
  {
    title: "MentalMotion op de UITweek",
    slug: "mental-motion-op-de-uitweek",
    authors: ["Marik", "Sofia"],
    date: "12-08-2024",
  },
];

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

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Blog Posts
          </h1>
          <p className="text-base-content/70">
            Manage blog posts
          </p>
        </div>

        {/* Info Alert */}
        <div className="alert alert-info">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Blog posts are currently managed in the codebase. Database integration coming soon.
          </span>
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
        </div>

        {/* Blog Posts List */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-base-200"
              >
                <div>
                  <h3 className="font-semibold text-base-content">{post.title}</h3>
                  <p className="text-sm text-base-content/60 mt-1">
                    By {post.authors.join(', ')} • {post.date}
                  </p>
                  <p className="text-xs text-base-content/40 mt-1">
                    Slug: {post.slug}
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
            ))}
          </div>
        </div>

        {/* Future Feature Info */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Coming Soon</h2>
          <ul className="space-y-2 text-base-content/70">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Store blog posts in Supabase database
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create and edit blog posts with WYSIWYG editor
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upload and manage blog post images
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Publish/unpublish posts
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
