'use client'

import React from 'react';
import TransitionWithBorder from '@/src/components/TransitionWithBorder.jsx';
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

const posts = [
    {
        title: 'De tegelwijsheden hangen!',
        slug: 'de-tegelwijsheden-hangen',
        banner: '/images/praat-erover-dat-helpt-echt.jpeg',
        authors: [
            'Marik',
            'Sofia',
        ],
        description: 'Op 20 september organiseerden we bij MentalMotion een klusdag op onze locatie De Peer, om deze helemaal gereed te maken voor jullie! Tijdens deze dag hebben we onder andere de grote raamstickers geplakt, een groot whiteboard opgehangen en de prachtige tegeltjes, gemaakt door studenten tijdens de UIT, een mooie plek',
        date: '18-10-2024',
    },
    {
        title: 'MentalMotion op de UITweek',
        slug: 'mental-motion-op-de-uitweek',
        banner: '/images/Uitweek2024.jpeg',
        authors: [
            'Marik',
            'Sofia',
        ],
        description: 'Op 12 Augustus stonden we met MentalMotion op de UITweek! Tijdens deze dag konden de nieuwe studenten met ons kennismaken en kon je een eigen tegelwijsheid schrijven voor jezelf of de ander.\n' +
            'We hebben een hele leuke en warme dag gehad!',
        date: '12-08-2024',
    },
];

const BlogPage = () => {
    return (
        <div className="flex flex-col bg-white pt-24 lg:pt-44">
            <div className={'max-w-7xl mb-16 mx-auto px-2 lg:px-0'}>
                <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
                    <div className="text-center lg:text-center">
                        <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
                            <span>Blog</span>
                        </h1>

                        <p className={'text-xl font-black text-gray-700 mb-8 md:text-2xl'}>
                            Lees hier ons laatste nieuws!
                        </p>
                    </div>
                </div>

                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {
                        posts.map((post, index) => {
                            return (
                                <li key={index} className={'my-4'}>
                                    <div className={index % 2 ? "timeline-end" : "timeline-start"}>
                                    </div>
                                    <div className={`${index % 2 ? "timeline-end" : "timeline-start md:text-end"} mb-10`}>
                                        <time className="font-mono italic">{post.date}</time>
                                        <div className="text-lg font-black">{post.title}</div>
                                        {post.description}
                                        <div className="card-actions justify-end">
                                            <a href={`/blog/${post.slug}`} className={'btn btn-ghost'}>Lees verder</a>
                                        </div>
                                    </div>
                                    <img src={post.banner} className={`max-h-48 ml-16 ${index % 2 ? "timeline-start mr-16" : "timeline-end ml-16"}`}/>
                                    <hr />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-900'}/>
        </div>
    );
};

export default BlogPage;