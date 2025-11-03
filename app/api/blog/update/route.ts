import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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

    // Update the blog post
    const { error } = await supabase
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
      .eq("id", data.id);

    if (error) {
      console.error("Error updating blog post:", error);
      return NextResponse.json(
        { error: "Failed to update blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
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
