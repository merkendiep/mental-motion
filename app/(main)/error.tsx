'use client'

import NavBar from "@/src/components/NavBar";

export default function NotFound() {
    return <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div
                className={'text-center'}>
                <h1 className="text-9xl font-bold text-gray-800">500</h1>

                <div className="mt-4 mb-8">
                    <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
                </div>

                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Er is iets misgegaan</h2>

                <p className="text-gray-600 text-lg mb-8">
                    Oeps! De pagina die u probeert te bezoeken werkt niet. Neem contact op met info@mentalmotion.nl
                </p>

                <a href={'/'} className={'btn btn-primary'}>
                    Terug naar thuispagina
                </a>
            </div>
        </div>
    </div>
}