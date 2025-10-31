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
} from "@heroicons/react/24/outline";
import Link from "next/link";

const localizer = momentLocalizer(moment);

interface CalendarProps {
  events?: Event[];
}

const Calendar = ({ events = [] }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

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
      },
    };
  });

  const handleNavigate = useCallback(
    (date: Date, view: View, action: NavigateAction) => {
      setCurrentDate(date);
    },
    []
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

  const formatDateLabel = () => {
    if (view === "month") {
      return moment(currentDate).format("MMMM YYYY");
    }
    return moment(currentDate).format("MMM DD, YYYY");
  };

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
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
            toolbar={false} // We use custom toolbar
            style={{ height: view === "agenda" ? 400 : 600 }}
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
        }

        .calendar-container .rbc-month-row {
          border-bottom: 1px solid #f3f4f6;
        }

        .calendar-container .rbc-day-bg {
          border-left: 1px solid #f3f4f6;
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
