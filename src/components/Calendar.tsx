import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface CalendarProps {
  events?: Event[];
}

const Calendar = ({ events = [] }: CalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Handle keyboard events for dialog
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedEvent) {
        closeModal();
      }
    };

    if (selectedEvent) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent]);

  // Transform events from the page format to react-big-calendar format
  const calendarEvents = events.map((event) => {
    const eventDate = moment(event.date);
    const [hours, minutes] = event.time.split(":");
    eventDate.set({ hour: parseInt(hours), minute: parseInt(minutes) });

    return {
      id: event.id,
      title: event.title,
      start: eventDate.toDate(),
      end: eventDate.clone().add(2, "hours").toDate(), // Assume 2-hour duration
      resource: {
        location: event.location,
        description: event.description,
        originalEvent: event, // Keep reference to original event
      },
    };
  });

  const handleSelectEvent = (calendarEvent: any) => {
    setSelectedEvent(calendarEvent.resource.originalEvent);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <ReactBigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month"]}
        events={calendarEvents}
        onSelectEvent={handleSelectEvent}
        style={{ height: 600 }}
      />

      {/* Event Details Dialog */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative transform transition-all duration-200 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
            >
              ×
            </button>

            {/* Event details */}
            <div className="mb-6">
              <div className="mb-4 text-sm text-primary flex items-center gap-2">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {new Date(selectedEvent.date).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="font-medium">{selectedEvent.time}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedEvent.title}
              </h2>

              <div className="text-primary font-semibold mb-4 flex items-center gap-2">
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
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {selectedEvent.location}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Sluiten
              </button>
              <Link
                href={`/event/${selectedEvent.id}`}
                className="flex-1 text-center bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={closeModal}
              >
                Meld je aan
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
