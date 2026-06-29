import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder.jsx";
import Calendar from "@/src/components/Calendar";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { eventService } from "@/src/services/eventService";
import { Event } from "@/src/lib/supabase";

const formatMobileDateParts = (dateStr: string) => {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString("nl-NL", {
    day: "numeric",
    timeZone: "Europe/Amsterdam",
  });
  const month = d
    .toLocaleDateString("nl-NL", {
      month: "short",
      timeZone: "Europe/Amsterdam",
    })
    .replace(".", "")
    .toUpperCase();
  const weekday = d
    .toLocaleDateString("nl-NL", {
      weekday: "short",
      timeZone: "Europe/Amsterdam",
    })
    .replace(".", "")
    .toUpperCase();
  return { day, month, weekday };
};

const EmptyEventsState = () => (
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
      Er zijn momenteel geen geplande events. Houd deze pagina in de gaten voor
      nieuwe aankondigingen.
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
);

const MobileEventCard = ({ event }: { event: Event }) => {
  const { day, month, weekday } = formatMobileDateParts(event.date);
  return (
    <Link
      href={`/event/${event.id}`}
      className="group w-full flex items-center gap-3 sm:gap-4 rounded-2xl border border-primary/20 bg-white p-2.5 sm:p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-14 w-12 sm:h-20 sm:w-16 shrink-0 flex-col items-center justify-center rounded-lg sm:rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <span className="text-xl sm:text-2xl font-black leading-none">
          {day}
        </span>
        <span className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
          {month}
        </span>
        <span className="hidden sm:block mt-0.5 text-[10px] uppercase tracking-wider opacity-70">
          {weekday}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm sm:text-base font-semibold text-gray-900 transition-colors group-hover:text-primary">
          {event.title}
        </h3>
        <div className="mt-1 flex items-center gap-x-1.5 overflow-hidden text-sm text-gray-600">
          <span className="shrink-0 font-medium text-primary">
            {event.time}
          </span>
          <span className="shrink-0 text-gray-300">·</span>
          <span className="truncate min-w-0">{event.location}</span>
        </div>
        {event.signup_enabled && (
          <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            Aanmelden mogelijk
          </span>
        )}
      </div>
      <ChevronRightIcon
        className="h-5 w-5 shrink-0 text-primary/60 transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
};

const MobileUpcomingList = ({ events }: { events: Event[] }) => (
  <section className="w-full mx-auto mb-12 max-w-5xl px-4 lg:hidden">
    {events.length > 0 ? (
      <div className="space-y-3">
        {events.map((event) => (
          <MobileEventCard key={event.id} event={event} />
        ))}
      </div>
    ) : (
      <EmptyEventsState />
    )}
  </section>
);

const NextEvents = ({ events }: { events: Event[] }) => (
  <section className="hidden lg:block max-w-5xl mx-auto mb-16 px-4 relative z-10">
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
                    timeZone: "Europe/Amsterdam",
                  })}
                </span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {event.title}
              </h3>
              <div className="text-primary mb-2">{event.location}</div>
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
        <EmptyEventsState />
      )}
    </div>
    {/* Decorative divider */}
    <div className="flex justify-center mt-[-24px] mb-12">
      <div className="h-2 w-48 rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-60 shadow-lg"></div>
    </div>
  </section>
);

const BlogPage = async () => {
  // Fetch all events and upcoming events from Supabase
  const allEvents = await eventService.getAllEventsIncludingPast();
  const upcomingEvents = await eventService.getUpcomingEvents();

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

      <MobileUpcomingList events={upcomingEvents} />

      {/* Calendar Section */}
      <div className="hidden lg:block md:px-8 lg:px-12 xl:px-20 2xl:px-64 p-4">
        <div className="rounded-3xl shadow-md border border-primary/20 p-4 sm:p-8">
          <Calendar events={allEvents} />
        </div>
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default BlogPage;
