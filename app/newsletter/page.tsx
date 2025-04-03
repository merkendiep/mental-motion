'use client'

import React from 'react';
import NavBar from '@/src/components/NavBar';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';

const NewsletterPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <NavBar/>

            <div className={'mb-16 pt-32 lg:pt-44'}>
                <Contact/>
            </div>

            <Footer/>
        </div>
    );
};

export default NewsletterPage;