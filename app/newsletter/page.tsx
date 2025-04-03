'use client'

import React from 'react';
import NavBar from '@/src/components/NavBar';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

const NewsletterPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white pt-32">
            <NavBar/>

            <WorkInProgressWarning/>

            <br/>

            <Contact/>

            <Footer/>
        </div>
    );
};

export default NewsletterPage;