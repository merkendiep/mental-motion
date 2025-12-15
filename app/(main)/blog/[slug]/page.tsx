import Link from "next/link";
import { notFound } from "next/navigation";
import { blogService } from "@/src/services/blogService";
import { sanitizeHtml } from "@/src/lib/sanitize.server";

type tParams = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: tParams }) {
  const { slug } = await params;

  // Fetch the blog post from Supabase
  const post = await blogService.getPostBySlug(slug);

  // Show 404 if post not found
  if (!post) {
    notFound();
  }

  // TypeScript doesn't recognize notFound() throws, so assert post is not null
  const confirmedPost = post!;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 pt-24 lg:pt-44">
      <div className="max-w-2xl w-full mx-auto px-4">
        <Link href="/blog" className="btn btn-ghost">
          ← Terug
        </Link>
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-16">
          <img
            src={confirmedPost.banner}
            alt={confirmedPost.title}
            className="mb-8 max-w-full max-h-80 w-full h-auto object-cover rounded-xl shadow"
          />
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {confirmedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span>{confirmedPost.authors.join(", ")}</span>
              <span>•</span>
              <time className="italic">{confirmedPost.date}</time>
            </div>
          </header>
          <section
            className="prose prose-lg max-w-none text-gray-700 [&_p]:mb-[14px]"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(confirmedPost.content),
            }}
          />
        </article>
      </div>
    </div>
  );
}
