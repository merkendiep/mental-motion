import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder.jsx";
import { blogService } from "@/src/services/blogService";

const BlogPage = async () => {
  // Fetch blog posts from Supabase
  const posts = await blogService.getPublishedPosts();
  return (
    <div className="flex flex-col bg-base-100 pt-24 lg:pt-44">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-base-content mb-4 uppercase tracking-tight">
            Blog
          </h1>
          <p className="text-lg md:text-2xl text-base-content/70 font-semibold">
            Lees hier ons laatste nieuws!
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow duration-300 rounded-3xl"
            >
              <a href={`/blog/${post.slug}`}>
                <figure className="rounded-t-3xl overflow-hidden">
                  <img
                    src={post.banner}
                    alt={post.title}
                    className="w-full h-56 object-cover rounded-t-3xl"
                  />
                </figure>
              </a>
              <div className="card-body flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary badge-outline font-bold uppercase tracking-wide">
                    {post.date}
                  </span>
                </div>
                <a href={`/blog/${post.slug}`}>
                  <h2 className="card-title text-base-content hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                </a>
                <p className="text-base-content/70 flex-1 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {post.authors.map((author, i) => (
                      <span
                        key={i}
                        className="badge badge-secondary badge-outline"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="btn btn-primary btn-sm rounded-full font-bold px-6"
                  >
                    Lees verder
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-base-100"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default BlogPage;
