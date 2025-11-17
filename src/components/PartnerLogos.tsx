import { createServerSupabaseClient } from "@/src/lib/supabase";
import { Partner } from "@/src/services/partnerService";

/**
 * PartnerLogos Component
 * Displays partner logos on the public site
 * 
 * Usage:
 * import PartnerLogos from "@/src/components/PartnerLogos";
 * 
 * <PartnerLogos />
 */
export default async function PartnerLogos() {
  // Fetch all partners from Supabase
  const supabase = await createServerSupabaseClient();
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching partners:", error);
    return null;
  }

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-items-center">
          {partners.map((partner: Partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full max-w-[200px] h-24 p-4 transition-all hover:scale-105"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
