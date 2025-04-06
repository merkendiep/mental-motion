'use client'

import React from 'react';
import Contact from "@/src/components/Contact";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

const ContactPage = () => {
    return (
        <div className="flex flex-col bg-white">
            <div className={'pt-32 lg:pt-44'}>
                <Contact/>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>
        </div>
    );
};

export default ContactPage;