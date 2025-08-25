"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { eventsService, Event } from "@/src/lib/pocketbase";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

type tParams = Promise<{ id: string }>;

export default function EventPage({ params }: { params: tParams }) {
  const router = useRouter();
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) {
        setError("Event ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await eventsService.getById(String(id));
        if (eventData) {
          setEvent(eventData);
        } else {
          setError("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();
    alert(`Bedankt voor je aanmelding, ${name}!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg font-semibold text-primary">
        Laden...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          {/* Error Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full translate-x-12 translate-y-12"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Event niet gevonden
              </h1>

              {/* Error Message */}
              <p className="text-gray-600 mb-2 leading-relaxed">
                Het lijkt erop dat dit event niet bestaat of niet meer
                beschikbaar is.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Neem contact met ons op als je denkt dat dit een fout is.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Terug
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact opnemen
                </Link>
              </div>

              {/* Additional Help */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-3">
                  Misschien vind je dit wel interessant:
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <Link
                    href="/calendar"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Alle events
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    href="/"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Homepage
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    href="/about"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Over ons
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-2xl pt-24 mx-auto p-4 flex flex-col gap-10">
        {/* Back Button */}
        <div className="flex justify-start -mb-6">
          <button
            onClick={() => router.back()}
            className="btn btn-outline btn-primary rounded-full px-6 py-2 hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Terug
          </button>
        </div>

        {/* Event Card */}
        <div className="card bg-white shadow-xl rounded-3xl border border-base-200 pb-8 px-8 relative">
          <div className="card-body items-center text-center">
            <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">
              {event.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <span className="inline-block bg-primary text-white font-bold px-5 py-2 rounded-full text-lg shadow">
                {event.date} &bull; {event.time}
              </span>
              <span className="inline-block bg-white border border-primary text-primary font-semibold px-4 py-2 rounded-full text-base shadow-sm">
                <svg
                  className="inline-block w-5 h-5 mr-1 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location}
              </span>
            </div>
            <p className="text-base-content/90 text-lg mb-2">
              {event.description}
            </p>
          </div>
        </div>

        {/* Application Form Card */}
        <div className="card bg-white shadow-lg rounded-3xl border border-base-200 px-8 py-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Aanmelden voor dit event
            </h2>
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
                <span className="label-text font-semibold mb-1">
                  E-mailadres
                </span>
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

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
}
