"use client";

import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder.jsx";
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";
import Calendar from "@/src/components/Calendar";
import Link from "next/link";
import { staticEvents, Event } from "@/src/data/events";

const NextEvents = ({ events }: { events: Event[] }) => (
  <section className="max-w-5xl mx-auto mb-16 px-4 relative z-10">
    <div className="bg-gradient-to-br from-primary/20 via-white to-white rounded-3xl shadow-md border border-primary/20 p-8">
      {events.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg border border-primary/20 p-6 flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="mb-2 text-sm text-primary flex items-center gap-2">
                <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  {new Date(event.date).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {event.title}
              </h3>
              <div className="text-primary mb-2">{event.location}</div>
              <p className="text-gray-500 text-sm flex-1">
                {event.description}
              </p>
              <Link
                href={`/event/${event.id}`}
                className="mt-4 inline-block text-center bg-primary hover:bg-primary/80 text-primary-content font-semibold px-4 py-2 rounded-lg shadow transition-colors"
              >
                Bekijk event
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 text-primary/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Geen aankomende events
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Er zijn momenteel geen geplande events. Houd deze pagina in de gaten
            voor nieuwe aankondigingen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Suggereer een event
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/80 transition-colors font-medium"
            >
              Blijf op de hoogte
            </Link>
          </div>
        </div>
      )}
    </div>
    {/* Decorative divider */}
    <div className="flex justify-center mt-[-24px] mb-12">
      <div className="h-2 w-48 rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-60 shadow-lg"></div>
    </div>
  </section>
);

const BlogPage = () => {
  // Get only future events and sort them by date
  const upcomingEvents = staticEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col bg-white pt-24 lg:pt-36">
      <div className={"max-w-7xl mb-8 mx-auto px-2 lg:px-0"}>
        <div className="text-center lg:text-center">
          <h1 className="text-2xl font-black text-gray-700 my-0 uppercase md:text-6xl">
            <span>Aankomende events</span>
          </h1>
        </div>
      </div>

      {/* Next 3 Events Section */}
      <NextEvents events={upcomingEvents} />

      {/* Calendar Section */}
      <div className="md:px-8 lg:px-12 xl:px-20 2xl:px-64 p-4">
        <div className="rounded-3xl shadow-md border border-primary/20 p-4 sm:p-8">
          <Calendar events={staticEvents} />
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default BlogPage;
