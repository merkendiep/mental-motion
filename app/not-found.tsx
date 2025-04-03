'use client'

import NavBar from "@/src/components/NavBar";

export default function NotFound() {
    return <div className={'pt-32'}>
        <NavBar/>

        <h1 className={'text-4xl text-center py-8'}>404 - Page Not Found</h1>
    </div>
}