import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.scss";
import Popup from "../../../../common/components/Popup/Popup";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import toast from "react-hot-toast";
import Form from "../../../../common/components/Form/Form";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import axios from "axios";

const localizer = momentLocalizer(moment);

const eventInputs = [
  {
    id: "titleInput",
    name: "title",
    type: "text",
    placeholder: "Enter event title",
    label: "Event Title",
    category: "input",
  },
  {
    id: "descriptionInput",
    name: "description",
    type: "text",
    placeholder: "Enter event description",
    label: "Event Description",
    category: "textarea",
  }
];

const getEventsUrl = "/api/event/get";
const createEventUrl = "/api/event/create";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  useEffect(()=>{
    axios.get(getEventsUrl)
    .then(response=>{
      console.log(response.data.events);
      setEvents(response.data.events);
    })
    .catch(handleAxiosError)
  },[])

  const handleSelectSlot = (slotInfo) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    }));
    setShowCreateEvent(true);
  };

  const handleSelectEvent = (event) => {
    setEvent(event);
    setShowEvent(true);
  };

  const CustomAgendaEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <p>{event.description}</p>
    </div>
  );

  const onFormSubmit = e => {
    e.preventDefault();
    axios.post(createEventUrl, {...event})
    .then(response=>toast.success(response.data.message))
    .catch(handleAxiosError)
    setShowCreateEvent(false);
}

  return (
    <>
      <CommonHelmet title="Hexis - Calendar" />
      <div className="container" style={{ height: "80vh" }}>
        <h2>Calendar</h2>
        <hr />
        <Calendar localizer={localizer} className="calendar" events={events} startAccessor="start" endAccessor="end" selectable onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent} components={{agenda: {event: CustomAgendaEvent,}}}/>
        {showCreateEvent && !showEvent &&                   
          <Popup showPopup={showCreateEvent} setShowPopup={setShowCreateEvent}>
              <Form headline="Create Event" formValues={event} setFormValues={setEvent} onFormSubmit={onFormSubmit} formInputs={eventInputs} />
          </Popup>
        }
        {!showCreateEvent && showEvent &&                   
          <Popup showPopup={showEvent} setShowPopup={setShowEvent}>
              <strong>{event.title}</strong>
              <hr />
              <p className="m0">{event.description}</p>
          </Popup>
        }
      </div>
    </>
  );
};

export default EventCalendar;
