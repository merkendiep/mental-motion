import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/src/lib/supabase";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import { sanitizeString } from "@/src/lib/validation";

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
    if (!data.name || !data.logo || !data.url) {
      return NextResponse.json(
        { error: "Missing required fields (name, logo, url)" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Create the partner with sanitized inputs
    const { data: newPartner, error } = await supabase
      .from("partners")
      .insert({
        name: sanitizeString(data.name),
        logo: sanitizeString(data.logo),
        url: sanitizeString(data.url),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating partner:", error);
      return NextResponse.json(
        { error: "Failed to create partner: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      partner: newPartner,
      message: "Partner created successfully",
    });
  } catch (error: any) {
    console.error("Partner creation error:", error);
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
    if (!data.id || !data.name || !data.logo || !data.url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // Update the partner with sanitized inputs
    const { data: updatedPartner, error } = await supabase
      .from("partners")
      .update({
        name: sanitizeString(data.name),
        logo: sanitizeString(data.logo),
        url: sanitizeString(data.url),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating partner:", error);
      return NextResponse.json(
        { error: "Failed to update partner: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      partner: updatedPartner,
      message: "Partner updated successfully",
    });
  } catch (error) {
    console.error("Partner update error:", error);
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
        { error: "Partner ID is required" },
        { status: 400 }
      );
    }

    // Create authenticated Supabase client
    const supabase = await createServerSupabaseClient();

    // First verify the partner exists
    const { data: existingPartner, error: checkError } = await supabase
      .from("partners")
      .select("id, name")
      .eq("id", data.id)
      .single();

    if (checkError || !existingPartner) {
      return NextResponse.json(
        { error: `Partner with ID "${data.id}" not found` },
        { status: 404 }
      );
    }

    // Delete the partner
    const { data: deletedData, error } = await supabase
      .from("partners")
      .delete()
      .eq("id", data.id)
      .select();

    if (error) {
      console.error("Error deleting partner:", error);
      return NextResponse.json(
        { error: "Failed to delete partner: " + error.message },
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
      message: "Partner deleted successfully",
    });
  } catch (error: any) {
    console.error("Partner deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
