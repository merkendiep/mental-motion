import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import { createServerSupabaseClient } from "@/src/lib/supabase";

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
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

    // Parse request body
    const body = await request.json();
    const { id, title, date, time, location, description } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Prepare updates
    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (date !== undefined) updates.date = date;
    if (time !== undefined) updates.time = time;
    if (location !== undefined) updates.location = location;
    if (description !== undefined) updates.description = description;

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Update event using authenticated client
    const { data, error } = await supabase
      .from("events")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating event:", error);

      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: `Event with ID "${id}" not found in database` },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Failed to update event" },
        { status: 500 }
      );
    }

    const updatedEvent = data;

    return NextResponse.json({
      success: true,
      event: updatedEvent,
    });
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update event" },
      { status: 500 }
    );
  }
}
