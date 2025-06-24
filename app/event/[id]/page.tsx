'use client'

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import TransitionWithBorder from '@/src/components/TransitionWithBorder';

// Mock event data (in a real application, this would be fetched from an API)
const events = [
    {
        id: 1,
        title: "Mindful Movement Workshop",
        date: "2025-07-01",
        time: "18:00",
        location: "Studio A",
        description: "A relaxing evening of mindful movement and meditation."
    },
    {
        id: 2,
        title: "Outdoor Yoga Session",
        date: "2025-07-05",
        time: "10:00",
        location: "City Park",
        description: "Join us for a refreshing yoga session in the park."
    },
    {
        id: 3,
        title: "Breathwork & Sound Bath",
        date: "2025-07-10",
        time: "19:30",
        location: "Wellness Center",
        description: "Experience deep relaxation with breathwork and sound healing."
    }
];

type tParams = Promise<{ id: Number | string }>;

export default function EventPage({ params }: { params: tParams }) {
    const router = useRouter();
    const { id } = use(params);
    const event = events.find(event => id ? event.id === parseInt(String(id), 10) : false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    interface Event {
        id: number;
        title: string;
        date: string;
        time: string;
        location: string;
        description: string;
    }

    interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

    const handleSubmit = (e: HandleSubmitEvent) => {
        e.preventDefault();
        alert(`Bedankt voor je aanmelding, ${name}!`);
    };

    if (!event) {
        return <div className="flex items-center justify-center min-h-[60vh] text-lg font-semibold text-primary">Laden...</div>;
    }

    return (
        <div>
            <div className="max-w-2xl pt-24 mx-auto p-4 flex flex-col gap-10">
                {/* Event Thumbnail */}
                <div className="flex justify-center -mb-16 z-10">
                    <div className="rounded-full shadow-lg border-4 border-white w-40 h-40 bg-primary flex items-center justify-center overflow-hidden">
                        {/* Vervang src door je eigen event afbeelding */}
                        <img
                            src={`https://source.unsplash.com/400x400/?wellness,${event.title.split(' ')[0]}`}
                            alt={event.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Event Card */}
                <div className="card bg-white shadow-xl rounded-3xl border border-base-200 pt-20 pb-8 px-8 relative">
                    <div className="card-body items-center text-center">
                        <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">{event.title}</h1>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                            <span className="inline-block bg-primary text-white font-bold px-5 py-2 rounded-full text-lg shadow">
                                {event.date} &bull; {event.time}
                            </span>
                            <span className="inline-block bg-white border border-primary text-primary font-semibold px-4 py-2 rounded-full text-base shadow-sm">
                                <svg className="inline-block w-5 h-5 mr-1 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                            </span>
                        </div>
                        <p className="text-base-content/90 text-lg mb-2">{event.description}</p>
                    </div>
                </div>

                {/* Application Form Card */}
                <div className="card bg-white shadow-lg rounded-3xl border border-base-200 px-8 py-8">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Aanmelden voor dit event</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-1">Naam</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered input-primary w-full bg-base-100"
                                    required
                                    placeholder="Naam"
                                />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-1">E-mailadres</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered input-primary w-full bg-base-100"
                                    required
                                    placeholder="jij@email.com"
                                />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-1">Bericht</span>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="textarea textarea-bordered textarea-primary w-full bg-base-100"
                                    rows={4}
                                    placeholder="Vertel ons waarom je graag wilt deelnemen!"
                                />
                            </label>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg mt-2 rounded-full shadow hover:scale-105 transition-transform text-lg tracking-wide"
                            >
                                🎉 Aanmelden
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <TransitionWithBorder colorFrom={'bg-white'} colorTo={'bg-gray-900'} />
        </div>
    );
}