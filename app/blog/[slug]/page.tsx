import Link from "next/link";
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

const posts = {
    'de-tegelwijsheden-hangen': {
        title: 'De tegelwijsheden hangen!',
        banner: '/images/praat-erover-dat-helpt-echt.jpeg',
        authors: ['Marik', 'Sofia'],
        description: 'Op 20 september organiseerden we bij MentalMotion een klusdag op onze locatie De Peer, om deze helemaal gereed te maken voor jullie! Tijdens deze dag hebben we onder andere de grote raamstickers geplakt, een groot whiteboard opgehangen en de prachtige tegeltjes, gemaakt door studenten tijdens de UIT, een mooie plek',
        date: '18-10-2024',
    },
    'mental-motion-op-de-uitweek': {
        title: 'MentalMotion op de UITweek',
        banner: '/images/Uitweek2024.jpeg',
        authors: ['Marik', 'Sofia'],
        description: 'Op 12 Augustus stonden we met MentalMotion op de UITweek! Tijdens deze dag konden de nieuwe studenten met ons kennismaken en kon je een eigen tegelwijsheid schrijven voor jezelf of de ander. We hebben een hele leuke en warme dag gehad!',
        date: '12-08-2024',
    },
};

type PostKey = keyof typeof posts;

type BlogPostPageProps = {
    params: { slug: string }
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = posts[params.slug as PostKey];

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
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                            <span>
                                {post.authors.join(', ')}
                            </span>
                            <span>•</span>
                            <time className="italic">{post.date}</time>
                        </div>
                    </header>
                    <section className="prose prose-lg max-w-none text-gray-700">
                        <p>{post.description}</p>
                    </section>
                </article>
            </div>
        </div>
    );
}