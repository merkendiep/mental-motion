"use client";

import React, { useEffect, useState } from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder.jsx";
import WorkInProgressWarning from "@/src/components/WorkInProgressWarning";
import Calendar from "@/src/components/Calendar";
import Link from "next/link";
import { eventsService, Event } from "@/src/lib/pocketbase";

const NextEvents = ({ events }: { events: Event[] }) => (
  <section className="max-w-5xl mx-auto mb-16 px-4 relative z-10">
    <div className="bg-gradient-to-br from-primary/20 via-white to-white rounded-3xl shadow-md border border-primary/20 p-8">
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
            <p className="text-gray-500 text-sm flex-1">{event.description}</p>
            <Link
              href={`/event/${event.id}`}
              className="mt-4 inline-block text-center bg-primary hover:bg-primary/80 text-primary-content font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            >
              Bekijk event
            </Link>
          </div>
        ))}
      </div>
    </div>
    {/* Decorative divider */}
    <div className="flex justify-center mt-[-24px] mb-12">
      <div className="h-2 w-48 rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-60 shadow-lg"></div>
    </div>
  </section>
);

const BlogPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await eventsService.getAllSorted();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // Set empty array if PocketBase fails
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col bg-white pt-24 lg:pt-36">
        <div className="max-w-7xl mb-8 mx-auto px-2 lg:px-0">
          <div className="text-center lg:text-center">
            <h1 className="text-2xl font-black text-gray-700 my-0 uppercase md:text-6xl">
              <span>Aankomende events</span>
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

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
      <NextEvents events={events} />

      {/* Calendar Section */}
      <div className="hidden sm:block md:px-8 lg:px-12 xl:px-20 2xl:px-64 p-4">
        <div className="rounded-3xl shadow-md border border-primary/20 p-8">
          <Calendar events={events} />
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default BlogPage;
