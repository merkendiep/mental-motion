import { supabase } from '@/src/lib/supabase';

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
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      // Filter to only published posts unless explicitly requested
      if (!includeUnpublished) {
        query = query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw new Error('Failed to fetch blog posts');
      }

      return data || [];
    } catch (error) {
      console.error('Blog service error:', error);
      throw error;
    }
  }

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Not found
          return null;
        }
        console.error('Error fetching blog post:', error);
        throw new Error('Failed to fetch blog post');
      }

      return data;
    } catch (error) {
      console.error('Blog service error:', error);
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
}

// Export a singleton instance
export const blogService = new BlogService();
