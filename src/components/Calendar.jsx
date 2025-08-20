import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Some title",
  },
];

const Calendar = (props) => (
  <div>
    <ReactBigCalendar
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      views={["month"]}
      events={events}
      style={{ height: 600 }}
    />
  </div>
);

export default Calendar;
