import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../style.scss";
import NavBarIcons from "./NavBarIcons";

function Calendario() {
  const eventos = [
    {
      title: "Reunión",
      start: "2023-06-16",
      note: "personal",
    },
    {
      title: "Videollamada",
      start: "2023-06-16",
      note: "integración",
    },
    {
      title: "Valoraciones",
      start: "2023-06-12",
      end: "2023-06-17",
      note: "",
    },
  ];

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <p>{eventInfo.event.title}</p>
        <p>{eventInfo.event.extendedProps.note}</p>
      </div>
    );
  };

  return (
    <section>
      <NavBarIcons />
      <div className="calendario-container">
        <div className="calendario">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={eventos}
            eventContent={renderEventContent}
            locale={esLocale}
          />
        </div>
      </div>
    </section>
  );
}
export default Calendario;
