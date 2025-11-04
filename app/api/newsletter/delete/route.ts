import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/src/lib/supabase";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";

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

    // Get the subscription ID from the request body
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Delete the subscription from Supabase
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting subscription:", error);
      return NextResponse.json(
        { error: "Failed to delete subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Subscription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter delete API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
