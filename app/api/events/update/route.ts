import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import { createServerSupabaseClient } from "@/src/lib/supabase";

export async function POST(request: NextRequest) {
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
    const { title, date, time, location, description } = body;

    // Validate required fields
    if (!title || !date || !time || !location) {
      return NextResponse.json(
        { error: "Title, date, time, and location are required" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Generate a unique ID for the event (UUID format)
    const eventId = crypto.randomUUID();

    // Create new event using authenticated client
    const { data, error } = await supabase
      .from("events")
      .insert({
        id: eventId,
        title,
        date,
        time,
        location,
        description: description || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      return NextResponse.json(
        { error: "Failed to create event", details: error.message },
        { status: 500 }
      );
    }

    const newEvent = data;

    return NextResponse.json({
      success: true,
      event: newEvent,
    });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create event" },
      { status: 500 }
    );
  }
}

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

export async function DELETE(request: NextRequest) {
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
    const { id } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // First verify the event exists
    const { data: existingEvent, error: checkError } = await supabase
      .from("events")
      .select("id, title")
      .eq("id", id)
      .single();

    if (checkError || !existingEvent) {
      return NextResponse.json(
        { error: `Event with ID "${id}" not found in database` },
        { status: 404 }
      );
    }

    // Delete event using authenticated client
    const { data, error, count } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting event:", error);
      return NextResponse.json(
        { error: "Failed to delete event: " + error.message },
        { status: 500 }
      );
    }

    // Check if any rows were actually deleted
    if (!data || data.length === 0) {
      console.error(
        "Delete returned success but no rows were deleted. This may be a permissions issue."
      );
      return NextResponse.json(
        {
          error:
            "Delete operation blocked. Please check database permissions (RLS policies).",
          hint: "You may need to add a DELETE policy for the events table in Supabase.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete event" },
      { status: 500 }
    );
  }
}
