import Link from "next/link";
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

const posts = {
  "een-jaar-in-de-maak": {
    title: "One year in the making",
    banner: "/images/blogpost-3-cover.png",
    authors: ["Sofia"],
    description: `Jaar 2 is gestart! Dat klinkt minder spectaculair dan hoe het voelt. Toen ik begon bij MentalMotion, heette het nog geen MentalMotion, en was het niet veel meer dan een idee, of eigenlijk een plan van aanpak dat ik door mocht lezen tijdens een meeting in een koffietentje. Ik voelde al dat ik mee wilde doen voor mijn hoofd begreep wat dat precies zou betekenen.

Marik en Mieke liepen al een tijdje rond met dit plan, en stonden op het punt om een subsidieaanvraag te doen (die zou worden afgewezen). Dat MentalMotion kon starten was een kwestie van geduld en doorzettingsvermogen. Eerst was er een idee, daarna hadden we een kernteam, toen kozen we een naam. Na meer drempels dan we voorzien hadden vonden we een locatie én een eerste samenwerkingspartner, waardoor we De Peer konden gaan huren en inrichten. Er kwam een logo, een flyer. Nog een aantal maanden netwerken en schaven aan weer nieuwe aanvragen, tot we in de zomer van 2024 eindelijk genoeg geld bij elkaar hadden om in september te kunnen starten.

Dat was fantastisch. En heel veel tegelijk. Ik had tijdens het doen van die laatste aanvragen net mijn stage afgerond en de eerste versie van mijn masterscriptie geschreven. Toen we open gingen moest die scriptie nog af. "Voor studenten, door studenten", wat dat betekent heb ik vorig jaar echt doorleefd. Want een startup runnen en afstuderen is best een uitdaging. Bovendien wisten we nog niet wat daar allemaal bij komt kijken: hoe zorg je dat studenten weten dat je bestaat? wat voor activiteiten slaan aan? bij welke events kunnen we aanwezig zijn? hoe begeleid je vrijwilligers? en vooral: hoe zorg je dat je naast werk ook nog aan leven toekomt? Ons eerste jaar was een feest omdat we eindelijk, na zo lang plannen maken, mochten doen wat we wilden doen. Maar het was ook zwemmen, zeg maar gerust watertrappelen.

Dat we nu kunnen starten met ons tweede jaar voelt alsof we de vruchten kunnen plukken van ons harde werken in de jaren hiervoor. Dit is waar we het voor gedaan hebben. Nu weten we beter wat werkt, wat ons te wachten staat, en hoe we ons daarop voor kunnen bereiden. Bovendien zijn we niet meer 'alleen' maar werken we nu samen met fantastische vrijwilligers. En ons team is gegroeid. So far was deze maand naar werk toe gaan echt een feestje

Sofia`,
    date: "15-01-2025",
  },
  "de-tegelwijsheden-hangen": {
    title: "De tegelwijsheden hangen!",
    banner: "/images/praat-erover-dat-helpt-echt.jpeg",
    authors: ["Marik", "Sofia"],
    description:
      "Op 20 september organiseerden we bij MentalMotion een klusdag op onze locatie De Peer, om deze helemaal gereed te maken voor jullie! Tijdens deze dag hebben we onder andere de grote raamstickers geplakt, een groot whiteboard opgehangen en de prachtige tegeltjes, gemaakt door studenten tijdens de UIT, een mooie plek gegeven in De Peer. En dat is nog lang niet alles! Kom vooral eens langs om onze fijne locatie te bewonderen—misschien hangt jouw tegeltje wel bij ons aan de muur! Je bent van harte welkom!",
    date: "18-10-2024",
  },
  "mental-motion-op-de-uitweek": {
    title: "MentalMotion op de UITweek",
    banner: "/images/Uitweek2024.jpeg",
    authors: ["Marik", "Sofia"],
    description:
      "Op 12 Augustus stonden we met MentalMotion op de UITweek! Tijdens deze dag konden de nieuwe studenten met ons kennismaken en kon je een eigen tegelwijsheid schrijven voor jezelf of de ander. We hebben een hele leuke en warme dag gehad!",
    date: "12-08-2024",
  },
};

type PostKey = keyof typeof posts;
type tParams = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: tParams }) {
  const { slug } = await params;
  const post = posts[slug as PostKey];

  if (!post) {
    return <WorkInProgressWarning />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 pt-24 lg:pt-44">
      <div className="max-w-2xl w-full mx-auto px-4">
        <Link href="/blog" className="btn btn-ghost">
          ← Terug
        </Link>
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-16">
          <img
            src={post.banner}
            alt={post.title}
            className="mb-8 max-w-full max-h-80 w-full h-auto object-cover rounded-xl shadow"
          />
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span>{post.authors.join(", ")}</span>
              <span>•</span>
              <time className="italic">{post.date}</time>
            </div>
          </header>
          <section className="prose prose-lg max-w-none text-gray-700">
            {post.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
