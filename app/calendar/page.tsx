'use client'

import React from 'react';
import TransitionWithBorder from '@/src/components/TransitionWithBorder.jsx';
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";
import Calendar from "@/src/components/Calendar";



const BlogPage = () => {
    return (
        <div className="flex flex-col bg-white pt-24 lg:pt-36">
            <div className={'max-w-7xl mb-8 mx-auto px-2 lg:px-0'}>
                <div className="text-center lg:text-center">
                    <h1 className="text-2xl font-black text-gray-700 my-0 uppercase md:text-6xl">
                        <span>Onze events</span>
                    </h1>
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