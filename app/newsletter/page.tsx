'use client'

import React from 'react';
import Contact from '@/src/components/Contact';
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

const NewsletterPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white pt-32">
            <WorkInProgressWarning/>

            <br/>

            <Contact/>
        </div>
    );
};

export default NewsletterPage;