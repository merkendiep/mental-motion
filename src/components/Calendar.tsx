import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
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

  return (
    <div>
      <ReactBigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month"]}
        events={calendarEvents}
        style={{ height: 600 }}
      />
    </div>
  );
};

export default Calendar;
