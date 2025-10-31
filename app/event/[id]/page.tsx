import React from "react";
import { notFound } from "next/navigation";
import { eventService } from "@/src/services/eventService";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import EventForm from "@/src/components/EventForm";
import BackButton from "@/src/components/BackButton";

type tParams = Promise<{ id: string }>;

export default async function EventPage({ params }: { params: tParams }) {
  const { id } = await params;

  // Fetch the event from Supabase
  const event = await eventService.getEventById(id);

  // Show 404 if event not found
  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="max-w-2xl pt-24 mx-auto p-4 flex flex-col gap-10">
        {/* Back Button */}
        <div className="flex justify-start -mb-6">
          <BackButton />
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
            <div
              className="text-base-content/90 text-lg mb-2 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
        </div>

        {/* Application Form Card */}
        <EventForm event={event} />
      </div>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
}
