import { supabase, createServerSupabaseClient } from "@/src/lib/supabase";
import { sanitizeString } from "@/src/lib/validation";

/**
 * Blog Post Interface
 */
export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  banner: string;
  authors: string[];
  description: string;
  content: string;
  date: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Blog Service
 * Clean service for managing blog posts via Supabase
 */
export class BlogService {
  /**
   * Get all published blog posts sorted by date (descending)
   * Only returns published posts by default
   */
  async getAllPosts(includeUnpublished: boolean = false): Promise<BlogPost[]> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      let query = supabaseServer
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });

      // Filter to only published posts unless explicitly requested
      if (!includeUnpublished) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching blog posts:", error);
        throw new Error("Failed to fetch blog posts");
      }

      return data || [];
    } catch (error) {
      console.error("Blog service error:", error);
      throw error;
    }
  }

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const trimmedSlug = sanitizeString(slug);

      const { data, error } = await supabaseServer
        .from("blog_posts")
        .select("*")
        .eq("slug", trimmedSlug)
        .eq("published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        console.error("Error fetching blog post:", error);
        throw new Error("Failed to fetch blog post");
      }

      return data;
    } catch (error) {
      console.error("Blog service error:", error);
      throw error;
    }
  }

  /**
   * Get published posts (convenience method)
   */
  async getPublishedPosts(): Promise<BlogPost[]> {
    return this.getAllPosts(false);
  }

  /**
   * Get all posts including unpublished (for admin use)
   */
  async getAllPostsIncludingUnpublished(): Promise<BlogPost[]> {
    return this.getAllPosts(true);
  }

  /**
   * Create a new blog post
   */
  async createPost(
    postData: Omit<BlogPost, "id" | "created_at" | "updated_at">
  ): Promise<BlogPost> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          slug: sanitizeString(postData.slug),
          title: sanitizeString(postData.title),
          banner: sanitizeString(postData.banner),
          authors: Array.isArray(postData.authors)
            ? postData.authors.map((a) => sanitizeString(a))
            : [],
          description: sanitizeString(postData.description),
          content: postData.content, // Content should not be trimmed
          date: sanitizeString(postData.date),
          published: postData.published,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating blog post:", error);
        throw new Error("Failed to create blog post");
      }

      return data;
    } catch (error) {
      console.error("Blog post creation error:", error);
      throw error;
    }
  }

  /**
   * Update a blog post by ID
   */
  async updatePost(id: number, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      // Sanitize string fields in updates
      const sanitizedUpdates: Partial<BlogPost> = {};
      if (updates.slug !== undefined)
        sanitizedUpdates.slug = sanitizeString(updates.slug);
      if (updates.title !== undefined)
        sanitizedUpdates.title = sanitizeString(updates.title);
      if (updates.banner !== undefined)
        sanitizedUpdates.banner = sanitizeString(updates.banner);
      if (updates.authors !== undefined) {
        sanitizedUpdates.authors = Array.isArray(updates.authors)
          ? updates.authors.map((a) => sanitizeString(a))
          : updates.authors;
      }
      if (updates.description !== undefined)
        sanitizedUpdates.description = sanitizeString(updates.description);
      if (updates.content !== undefined)
        sanitizedUpdates.content = updates.content; // Don't trim content
      if (updates.date !== undefined)
        sanitizedUpdates.date = sanitizeString(updates.date);
      if (updates.published !== undefined)
        sanitizedUpdates.published = updates.published;

      const { data, error } = await supabase
        .from("blog_posts")
        .update({
          ...sanitizedUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating blog post:", error);

        if (error.code === "PGRST116") {
          throw new Error(`Blog post with ID "${id}" not found in database`);
        }

        throw new Error("Failed to update blog post");
      }

      return data;
    } catch (error) {
      console.error("Blog post update error:", error);
      throw error;
    }
  }

  /**
   * Delete a blog post by ID
   */
  async deletePost(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) {
        console.error("Error deleting blog post:", error);

        if (error.code === "PGRST116") {
          throw new Error(`Blog post with ID "${id}" not found in database`);
        }

        throw new Error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Blog post deletion error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const blogService = new BlogService();
