import { redirect } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/src/lib/auth";
import AdminLayout from "@/src/components/AdminLayout";
import PartnerEditClient from "@/src/components/PartnerEditClient";
import { createServerSupabaseClient } from "@/src/lib/supabase";

export default async function AdminPartnersPage() {
  // Check authentication
  const user = await getCurrentUser();

  if (!user || !user.email) {
    redirect("/admin/login");
  }

  // Check if user is admin
  const adminStatus = await isAdmin(user.email);
  if (!adminStatus) {
    redirect("/");
  }

  // Fetch all partners from Supabase using authenticated client
  const supabase = await createServerSupabaseClient();
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching partners:", error);
    throw new Error("Failed to fetch partners");
  }

  return (
    <AdminLayout userEmail={user.email}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Manage Partners
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            Add, edit, or remove partner logos displayed on the site
          </p>
        </div>

        <PartnerEditClient partners={partners || []} />
      </div>
    </AdminLayout>
  );
}
