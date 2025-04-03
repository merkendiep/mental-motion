'use client'

import React from 'react';
import NavBar from "@/src/components/NavBar";
import Contact from "@/src/components/Contact";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import Footer from "@/src/components/Footer";

const ContactPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <NavBar/>

            <div className={'pt-32 lg:pt-44'}>
                <Contact/>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>

            <Footer/>
        </div>
    );
};

export default ContactPage;