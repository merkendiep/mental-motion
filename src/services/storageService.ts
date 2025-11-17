import { supabase } from "@/src/lib/supabase";

/**
 * Storage Service
 * Clean service for managing file uploads via Supabase Storage
 */
export class StorageService {
  private bucketName: string;

  constructor(bucketName: string = "mentalmotion") {
    this.bucketName = bucketName;
  }

  /**
   * Upload a file to Supabase Storage
   * @param file - The file to upload
   * @param path - Optional path within the bucket (e.g., 'banners/image.jpg')
   * @returns The public URL of the uploaded file
   */
  async uploadFile(file: File, path?: string): Promise<string> {
    try {
      // Generate a unique filename if path is not provided
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName =
        path || `blogs/${timestamp}-${sanitizedFileName}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Error uploading file:", error);
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.bucketName).getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error("Storage service error:", error);
      throw error;
    }
  }

  /**
   * Delete a file from Supabase Storage
   * @param path - The path of the file to delete
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([path]);

      if (error) {
        console.error("Error deleting file:", error);
        throw new Error(`Failed to delete file: ${error.message}`);
      }
    } catch (error) {
      console.error("Storage deletion error:", error);
      throw error;
    }
  }

  /**
   * Get the public URL for a file
   * @param path - The path of the file
   * @returns The public URL
   */
  getPublicUrl(path: string): string {
    const {
      data: { publicUrl },
    } = supabase.storage.from(this.bucketName).getPublicUrl(path);
    return publicUrl;
  }

  /**
   * List files in a specific path
   * @param path - The path to list files from (default: root)
   * @returns Array of file objects
   */
  async listFiles(path: string = ""): Promise<any[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list(path, {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) {
        console.error("Error listing files:", error);
        throw new Error(`Failed to list files: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("Storage listing error:", error);
      throw error;
    }
  }
}

// Export a singleton instance for blog images
export const blogStorageService = new StorageService("mentalmotion");
