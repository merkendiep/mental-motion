'use client'

import React from 'react';
import TransitionWithBorder from '@/src/components/TransitionWithBorder.jsx';
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";
import Calendar from "@/src/components/Calendar";



const BlogPage = () => {
    return (
        <div className="flex flex-col bg-white pt-24 lg:pt-44">
            <div className={'max-w-7xl mb-16 mx-auto px-2 lg:px-0'}>
                <div className="hero-content flex-col mx-auto gap-8 lg:flex-row">
                    <div className="text-center lg:text-center">
                        <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
                            <span>Onze events</span>
                        </h1>

                        <p className={'text-xl font-black text-gray-700 mb-8 md:text-2xl'}>
                            Zie hier onze aankomende events en meld je aan!
                        </p>
                    </div>
                </div>
            </div>

            <div className='hidden sm:block md:px-8 lg:px-12 xl:px-20 2xl:px-64'>
                <Calendar/>
            </div>
            

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>
        </div>
    );
};

export default BlogPage;