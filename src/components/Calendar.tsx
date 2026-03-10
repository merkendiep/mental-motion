"use client";

import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
  View,
  NavigateAction,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "@/src/lib/supabase";
import { useState, useCallback } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const localizer = momentLocalizer(moment);

interface CalendarProps {
  events?: Event[];
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    location?: string;
    description?: string;
  };
}

const Calendar = ({ events = [] }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const [showMoreDate, setShowMoreDate] = useState<Date | null>(null);
  const [showMoreEvents, setShowMoreEvents] = useState<CalendarEvent[]>([]);

  // Transform events from the page format to react-big-calendar format
  const calendarEvents: CalendarEvent[] = events.map((event) => {
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
      },
    };
  });

  const handleNavigate = useCallback(
    (date: Date, view: View, action: NavigateAction) => {
      setCurrentDate(date);
    },
    [],
  );

  const handleViewChange = useCallback((view: View) => {
    setView(view);
  }, []);

  const navigatePrev = () => {
    const newDate = moment(currentDate)
      .subtract(1, view === "month" ? "month" : "week")
      .toDate();
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = moment(currentDate)
      .add(1, view === "month" ? "month" : "week")
      .toDate();
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const handleShowMore = useCallback((events: object[], date: Date) => {
    setShowMoreEvents(events as CalendarEvent[]);
    setShowMoreDate(date);
  }, []);

  const closeShowMoreModal = useCallback(() => {
    setShowMoreDate(null);
    setShowMoreEvents([]);
  }, []);

  const formatDateLabel = () => {
    if (view === "month") {
      return moment(currentDate).format("MMMM YYYY");
    }
    return moment(currentDate).format("MMM DD, YYYY");
  };

  const formatTimeRange = (start: Date, end: Date) =>
    `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;

  // Custom event component for better styling
  const EventComponent = ({ event }: { event: any }) => (
    <Link
      href={`/event/${event.id}`}
      className="block w-full h-full text-xs p-1 rounded-sm bg-primary text-primary-content hover:bg-primary/80 transition-colors"
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="flex items-center gap-1 text-xs opacity-90">
        <MapPinIcon className="w-3 h-3" />
        <span className="truncate">{event.resource?.location}</span>
      </div>
    </Link>
  );

  // Custom toolbar
  const CustomToolbar = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={navigatePrev}
          className="p-2 rounded-lg bg-white border border-primary/20 hover:bg-primary/5 transition-colors"
          title="Previous"
        >
          <ChevronLeftIcon className="w-5 h-5 text-primary" />
        </button>

        <button
          onClick={navigateToday}
          className="px-4 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/80 transition-colors font-medium text-sm"
        >
          Vandaag
        </button>

        <button
          onClick={navigateNext}
          className="p-2 rounded-lg bg-white border border-primary/20 hover:bg-primary/5 transition-colors"
          title="Next"
        >
          <ChevronRightIcon className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Current Date Display */}
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-gray-900">{formatDateLabel()}</h2>
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-1 bg-white rounded-lg border border-primary/20 p-1">
        <button
          onClick={() => setView("month")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            view === "month"
              ? "bg-primary text-primary-content"
              : "text-gray-600 hover:bg-primary/5"
          }`}
        >
          Maand
        </button>
        <button
          onClick={() => setView("week")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            view === "week"
              ? "bg-primary text-primary-content"
              : "text-gray-600 hover:bg-primary/5"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setView("agenda")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            view === "agenda"
              ? "bg-primary text-primary-content"
              : "text-gray-600 hover:bg-primary/5"
          }`}
        >
          Agenda
        </button>
      </div>
    </div>
  );

  return (
    <div className="calendar-container">
      <CustomToolbar />

      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-primary/20 p-8">
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-primary/30"
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Geen events in de kalender
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Er zijn momenteel geen events gepland. De kalender wordt
              bijgewerkt zodra er nieuwe events worden toegevoegd.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-primary/20 overflow-hidden">
          <ReactBigCalendar
            localizer={localizer}
            date={currentDate}
            view={view}
            views={["month", "week", "agenda"]}
            events={calendarEvents}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onShowMore={handleShowMore}
            toolbar={false} // We use custom toolbar
            popup={false}
            doShowMoreDrillDown={false}
            style={{ height: view === "agenda" ? 400 : 840 }}
            components={{
              event: EventComponent,
            }}
            eventPropGetter={(event) => ({
              className: "calendar-event",
              style: {
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
              },
            })}
            dayPropGetter={(date) => ({
              className: moment(date).isSame(moment(), "day") ? "today" : "",
            })}
          />
        </div>
      )}

      {showMoreDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="day-events-modal-title"
        >
          <button
            type="button"
            aria-label="Sluit popup"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            onClick={closeShowMoreModal}
          />

          <div className="relative z-10 w-full max-w-xl rounded-2xl border border-primary/20 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
              <div>
                <p className="text-sm font-medium text-primary">Events op</p>
                <h3
                  id="day-events-modal-title"
                  className="text-xl font-bold text-gray-900"
                >
                  {moment(showMoreDate).format("dddd D MMMM YYYY")}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {showMoreEvents.length} geplande
                  {showMoreEvents.length === 1
                    ? " activiteit"
                    : " activiteiten"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeShowMoreModal}
                className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                aria-label="Sluit popup"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-3 overflow-y-auto p-5">
              {showMoreEvents
                .slice()
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((event) => (
                  <Link
                    key={event.id}
                    href={`/event/${event.id}`}
                    onClick={closeShowMoreModal}
                    className="group block rounded-xl border border-primary/15 bg-linear-to-r from-primary/5 to-transparent p-4 transition-all hover:border-primary/35 hover:shadow-md"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="h-4 w-4 text-primary" />
                        {formatTimeRange(event.start, event.end)}
                      </span>
                      {event.resource?.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPinIcon className="h-4 w-4 text-primary" />
                          {event.resource.location}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .calendar-container .rbc-calendar {
          font-family: inherit;
        }

        .calendar-container .rbc-header {
          padding: 12px 8px;
          font-weight: 600;
          font-size: 14px;
          color: #374151;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .calendar-container .rbc-month-view {
          border: none;
        }

        .calendar-container .rbc-date-cell {
          padding: 8px;
          font-weight: 500;
          color: #6b7280;
        }

        .calendar-container .rbc-date-cell.rbc-off-range {
          color: #d1d5db;
        }

        .calendar-container .rbc-today {
          background-color: #f0fdf4 !important;
        }

        .calendar-container .rbc-date-cell.today {
          color: oklch(0.69 0.0948 171.09) !important;
          font-weight: 700;
        }

        .calendar-container .rbc-day-bg.rbc-today {
          background-color: #f0fdf4;
        }

        .calendar-container .rbc-event {
          border: none !important;
          background: transparent !important;
          padding: 2px !important;
          margin: 1px 0 !important;
        }

        .calendar-container .rbc-event-content {
          padding: 0;
        }

        .calendar-container .rbc-show-more {
          color: oklch(0.69 0.0948 171.09);
          font-weight: 500;
          font-size: 12px;
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          margin-top: 2px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .calendar-container .rbc-show-more:hover {
          color: oklch(0.69 0.0948 171.09);
          background: oklch(0.69 0.0948 171.09 / 0.12);
        }

        .calendar-container .rbc-month-row {
          border-bottom: 1px solid #f3f4f6;
          min-height: 160px;
        }

        .calendar-container .rbc-day-bg {
          border-left: 1px solid #f3f4f6;
        }

        .calendar-container .rbc-month-view .rbc-day-slot {
          min-height: 160px;
        }

        .calendar-container .rbc-time-view .rbc-time-gutter {
          background: #f9fafb;
        }

        .calendar-container .rbc-time-view .rbc-time-header {
          border-bottom: 1px solid #e5e7eb;
        }

        .calendar-container .rbc-agenda-view {
          padding: 20px;
        }

        .calendar-container .rbc-agenda-view table {
          border: none;
        }

        .calendar-container .rbc-agenda-view .rbc-agenda-event-cell {
          padding: 12px;
        }

        .calendar-container .rbc-agenda-view .rbc-agenda-date-cell {
          padding: 12px;
          background: #f9fafb;
          font-weight: 600;
          color: oklch(0.69 0.0948 171.09);
        }

        .calendar-container .rbc-agenda-view .rbc-agenda-time-cell {
          padding: 12px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
