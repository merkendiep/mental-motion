import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/src/lib/supabase";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminStatus = await isAdmin(user.email);
    if (!adminStatus) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields (title, slug, content)" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Create the blog post
    const { data: newPost, error } = await supabase
      .from("blog_posts")
      .insert({
        title: data.title,
        slug: data.slug,
        banner: data.banner || "",
        authors: data.authors || [],
        description: data.description || "",
        content: data.content,
        date: data.date || new Date().toISOString().split("T")[0],
        published: data.published !== undefined ? data.published : false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      return NextResponse.json(
        { error: "Failed to create blog post: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: newPost,
      message: "Blog post created successfully",
    });
  } catch (error: any) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminStatus = await isAdmin(user.email);
    if (!adminStatus) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.id || !data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Update the blog post
    const { data: updatedPost, error } = await supabase
      .from("blog_posts")
      .update({
        title: data.title,
        slug: data.slug,
        banner: data.banner,
        authors: data.authors,
        description: data.description,
        content: data.content,
        date: data.date,
        published: data.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      return NextResponse.json(
        { error: "Failed to update blog post: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: updatedPost,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminStatus = await isAdmin(user.email);
    if (!adminStatus) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // First verify the post exists
    const { data: existingPost, error: checkError } = await supabase
      .from("blog_posts")
      .select("id, title")
      .eq("id", data.id)
      .single();

    if (checkError || !existingPost) {
      return NextResponse.json(
        { error: `Blog post with ID "${data.id}" not found` },
        { status: 404 }
      );
    }

    // Delete the blog post
    const { data: deletedData, error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", data.id)
      .select();

    if (error) {
      console.error("Error deleting blog post:", error);
      return NextResponse.json(
        { error: "Failed to delete blog post: " + error.message },
        { status: 500 }
      );
    }

    // Check if any rows were actually deleted
    if (!deletedData || deletedData.length === 0) {
      console.error("Delete returned success but no rows were deleted.");
      return NextResponse.json(
        { error: "Delete operation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error: any) {
    console.error("Blog deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
