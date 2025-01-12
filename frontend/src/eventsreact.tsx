import React, { useState } from 'react';

interface Event {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  admin_approval: boolean;
}

export const Eventsreact = (): JSX.Element => {
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    admin_approval: false,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddEventVisible, SetisAddEventVisible] = useState(false);

  const HandleAddEvent = () => {
    if (newEvent.title.trim() !== '') {
      setEvents([...events, newEvent]);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        admin_approval: false,
      });
      SetisAddEventVisible(false);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      
      <button onClick={() => SetisAddEventVisible(!isAddEventVisible)}>
        {isAddEventVisible ? 'close event' : 'add event'}
      </button>

      {isAddEventVisible && (
        <div className= "Add event">
          <h2>Add Event</h2>
          <div className="input-container">
            <input
              type="text"
              value={newEvent.title}
              placeholder="Event title"
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <textarea
              value={newEvent.description}
              placeholder="Event description"
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <input
              type="date"
              value={newEvent.date}
              placeholder="Event date"
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="time"
              value={newEvent.start_time}
              placeholder="Start time"
              onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
            />
            <input
              type="time"
              value={newEvent.end_time}
              placeholder="End time"
              onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
            />
            <input
              type="text"
              value={newEvent.location}
              placeholder="Event location"
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </div>
          <button onClick={HandleAddEvent}>Add New Event</button>
          </div>
      )}
      
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h3>{event.title}</h3>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p>Location: {event.location}</p>
            <p>Admin Approval: {event.admin_approval ? 'Approved' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Eventsreact;

//het horen knoppen te zijn niet direct balken voor add