'use client'

import React from 'react';
import Contact from '@/src/components/Contact';

const NewsletterPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white pt-32 px-2 mg:px-0">
            <div className="flex w-full flex-col justify-center">
                <h1 className="text-center text-3xl font-semibold md:text-5xl">
                    Meld je aan voor de nieuwsbrief
                </h1>
            </div>

            <div className="card mt-8 lg:mx-6 lg:w-1/2">
                <div className="card-body mx-auto w-full overflow-hidden rounded-lg px-8 py-10 shadow-xl outline outline-base-content/5 lg:max-w-xl">

                    <form className="mt-6">
                        <div className="mt-6 flex-1">
                            <label htmlFor="email" className="mb-2 block text-sm">
                                Email
                            </label>
                            <input
                                id="email"
                                autoComplete="email"
                                type="email"
                                placeholder="abcd@example.com"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
                            <legend className="fieldset-legend">Kies nieuwsbrief</legend>

                            <label className="fieldset-label">
                                <input type="checkbox" defaultChecked className="checkbox"/>
                                Nieuwsbrief 1
                            </label>

                            <label className="fieldset-label">
                                <input type="checkbox" defaultChecked className="checkbox"/>
                                Nieuwsbrief 2
                            </label>

                            <label className="fieldset-label">
                                <input type="checkbox" defaultChecked className="checkbox"/>
                                Nieuwsbrief 3
                            </label>
                        </fieldset>

                        <button
                            className="btn btn-primary mt-6 w-full transform px-6 py-3 text-sm font-medium capitalize duration-300  ">
                            Verstuur
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPage;