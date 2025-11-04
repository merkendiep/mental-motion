"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/src/services/blogService";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/navigation";

interface BlogEditClientProps {
  posts: BlogPost[];
}

export default function BlogEditClient({ posts }: BlogEditClientProps) {
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    banner: "",
    authors: [] as string[],
    description: "",
    content: "",
    date: "",
    published: true,
  });
  const [authorsInput, setAuthorsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [publishedFilter, setPublishedFilter] = useState<"all" | "published" | "draft">("all");
  const [authorFilter, setAuthorFilter] = useState<string>("all");

  // Get unique authors for filter
  const uniqueAuthors = useMemo(() => {
    const authorsSet = new Set<string>();
    posts.forEach((post) => {
      post.authors.forEach((author) => authorsSet.add(author));
    });
    return Array.from(authorsSet).sort();
  }, [posts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(query)) ||
          (post.description && post.description.toLowerCase().includes(query)) ||
          (post.slug && post.slug.toLowerCase().includes(query))
      );
    }
    
    // Apply published filter
    if (publishedFilter !== "all") {
      filtered = filtered.filter((post) => {
        if (publishedFilter === "published") {
          return post.published === true;
        } else if (publishedFilter === "draft") {
          return post.published === false;
        }
        return true;
      });
    }
    
    // Apply author filter
    if (authorFilter !== "all") {
      filtered = filtered.filter((post) =>
        post.authors.includes(authorFilter)
      );
    }
    
    return filtered;
  }, [posts, searchQuery, publishedFilter, authorFilter]);

  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
    setIsCreatingNew(false);
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug,
        banner: post.banner,
        authors: post.authors,
        description: post.description,
        content: post.content,
        date: post.date,
        published: post.published,
      });
      setAuthorsInput(post.authors.join(", "));
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCreateNew = () => {
    setSelectedPostId(null);
    setEditingPost(null);
    setIsCreatingNew(true);
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      title: "",
      slug: "",
      banner: "",
      authors: [],
      description: "",
      content: "",
      date: today,
      published: false,
    });
    setAuthorsInput("");
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAuthorsChange = (value: string) => {
    setAuthorsInput(value);
    // Split by comma and trim whitespace
    const authorsArray = value
      .split(",")
      .map((author) => author.trim())
      .filter((author) => author.length > 0);
    setFormData((prev) => ({
      ...prev,
      authors: authorsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate authors
    if (formData.authors.length === 0) {
      setSubmitStatus("error");
      setErrorMessage("Please add at least one author");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (isCreatingNew) {
        // Create new blog post
        const response = await fetch("/api/blog/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
            setIsCreatingNew(false);
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to create blog post");
        }
      } else if (editingPost) {
        // Update existing blog post
        const response = await fetch("/api/blog/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingPost.id,
            ...formData,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to update blog post");
        }
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingPost) return;

    setIsDeleting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/blog/update", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPost.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setShowDeleteConfirm(false);
        // Refresh the page to get updated data
        setTimeout(() => {
          router.refresh();
          setEditingPost(null);
          setSelectedPostId(null);
        }, 1500);
      } else {
        throw new Error(result.error || "Failed to delete blog post");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Blog Post List */}
      <div className="lg:col-span-1">
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6 flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-lg lg:text-xl font-bold text-primary">
              Select Blog Post
            </h2>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary btn-sm"
              title="Create New Blog Post"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="space-y-2 mb-4 flex-shrink-0">
            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered input-sm w-full pl-9 text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value as "all" | "published" | "draft")}
              className="select select-bordered select-sm w-full text-sm"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            
            {uniqueAuthors.length > 0 && (
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="select select-bordered select-sm w-full text-sm"
              >
                <option value="all">All Authors</option>
                {uniqueAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-base-content/60 text-center py-8 text-sm">
                {searchQuery || publishedFilter !== "all" || authorFilter !== "all"
                  ? "No posts match your filters"
                  : "No blog posts found"}
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {filteredPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handlePostSelect(post.id!)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedPostId === post.id
                      ? "bg-primary text-primary-content border-primary shadow-md"
                      : "bg-base-100 border-base-300 hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate text-sm lg:text-base">
                        {post.title}
                      </div>
                      <div className="text-xs lg:text-sm opacity-80 mt-1">
                        {post.date}
                      </div>
                      {post.authors.length > 0 && (
                        <div className="text-xs opacity-70 mt-0.5 truncate">
                          {post.authors.join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {post.published ? (
                        <span className="badge badge-success badge-xs lg:badge-sm">
                          Published
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-xs lg:badge-sm">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Form */}
      <div className="lg:col-span-2">
        {editingPost || isCreatingNew ? (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4 lg:mb-6">
              {isCreatingNew ? "Create New Blog Post" : "Edit Blog Post"}
            </h2>

            {submitStatus === "success" ? (
              <div className="alert alert-success">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm lg:text-base">
                  Blog post successfully{" "}
                  {isCreatingNew
                    ? "created"
                    : isDeleting
                    ? "deleted"
                    : "updated"}
                  !
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="input input-bordered input-primary w-full text-sm lg:text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm lg:text-base">
                        Slug
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        handleInputChange("slug", e.target.value)
                      }
                      className="input input-bordered input-primary w-full text-sm lg:text-base"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm lg:text-base">
                        Date
                      </span>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="input input-bordered input-primary w-full text-sm lg:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Banner Image URL
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.banner}
                    onChange={(e) =>
                      handleInputChange("banner", e.target.value)
                    }
                    className="input input-bordered input-primary w-full text-sm lg:text-base"
                    required
                    placeholder="/images/..."
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Authors
                    </span>
                    <span className="label-text-alt text-xs">
                      Comma-separated
                    </span>
                  </label>
                  <input
                    type="text"
                    value={authorsInput}
                    onChange={(e) => handleAuthorsChange(e.target.value)}
                    className="input input-bordered input-primary w-full text-sm lg:text-base"
                    required
                    placeholder="e.g., Marik, Sofia"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Description (short summary)
                    </span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="textarea textarea-bordered textarea-primary w-full text-sm lg:text-base"
                    rows={3}
                    required
                    placeholder="Brief description for the blog listing page..."
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Content (full blog post)
                    </span>
                  </label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      handleInputChange("content", content)
                    }
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) =>
                        handleInputChange("published", e.target.checked)
                      }
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Published (visible on website)
                    </span>
                  </label>
                </div>

                {submitStatus === "error" && errorMessage && (
                  <div className="alert alert-error">
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="text-sm lg:text-base">{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isDeleting}
                    className={`btn btn-primary flex-1 text-sm lg:text-base ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    {isSubmitting
                      ? isCreatingNew
                        ? "Creating..."
                        : "Updating..."
                      : isCreatingNew
                      ? "Create Blog Post"
                      : "Update Blog Post"}
                  </button>

                  {!isCreatingNew && editingPost && (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isSubmitting || isDeleting}
                      className="btn btn-error text-sm lg:text-base"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingPost(null);
                      setSelectedPostId(null);
                      setIsCreatingNew(false);
                    }}
                    disabled={isSubmitting || isDeleting}
                    className="btn btn-ghost text-sm lg:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6 lg:p-8">
            <div className="text-center py-12 lg:py-16">
              <svg
                className="mx-auto h-16 w-16 lg:h-24 lg:w-24 text-primary/30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">
                No Blog Post Selected
              </h3>
              <p className="text-base-content/60 text-sm lg:text-base mb-4">
                Select a blog post from the list to edit or create a new blog
                post
              </p>
              <button
                onClick={handleCreateNew}
                className="btn btn-primary btn-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Blog Post
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-error"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>{editingPost?.title}</strong>? This blog post will be
              permanently removed from the database.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`btn btn-error flex-1 ${
                  isDeleting ? "loading" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete Blog Post"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
