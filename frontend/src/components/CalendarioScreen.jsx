import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../style.scss";

function Calendario() {
  const eventos = [
    {
      title: "Valoraciones",
      start: "2023-06-01",
      end: "2023-06-16",
      note: "Reagendadas",
    },
    {
      title: "Evento 2",
      start: "2023-06-05",
      note: "Nota para el evento 2",
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
        />
      </div>
    </div>
  );
}
export default Calendario;
