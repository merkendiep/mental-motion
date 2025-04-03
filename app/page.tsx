'use client'

import Image from "next/image";
import NavBar from "@/src/components/NavBar";
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import Footer from "@/src/components/Footer";
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <NavBar/>

            <div className={'bg-[url(/images/hero-home.png)] bg-no-repeat bg-cover pt-24 pb-12 rounded-bl-[5rem]'}>
                <Hero/>
            </div>

            <br/>

            <WorkInProgressWarning/>

            <Services/>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-800'}/>

            <Footer/>
        </div>
    );
}
