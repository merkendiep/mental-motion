'use client'

import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className={'bg-[url(/images/hero-home.png)] bg-no-repeat bg-cover pt-24 pb-12 rounded-bl-[5rem]'}>
                <Hero/>
            </div>

            <br/>

            <Services/>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>
        </div>
    );
}
