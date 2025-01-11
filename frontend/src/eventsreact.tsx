import React, { useState } from 'react';

interface Event {
  title: string;
  date: string;
  location: string;
}

export const Eventsreact = (): JSX.Element => {
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    date: '',
    location: '',
  });
  const [events, setEvents] = useState<Event[]>([]);

  const HandleAddEvent = () => {
    if (newEvent.title.trim() !== '') {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', date: '', location: '' });
    }
  };

  return (
    <div>
      <h1>Events</h1>
      
      <h2>Add event</h2>
      <input
        type="text"
        value={newEvent.title}
        placeholder="Event title"
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <input
        type="date"
        value={newEvent.date}
        placeholder="Event date"
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
      />
      <input
        type="text"
        value={newEvent.location}
        placeholder="Event location"
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
      />
      <button onClick={HandleAddEvent}>Add New Event</button>
      
      <h2>Upcoming Events</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {events.map((event, index) => (
          <li key={index} style={{ marginBottom: '8px', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
            <strong>{event.title}</strong> - {event.date} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Eventsreact;

//de inputfielden wil ik onder elkaar
//lijnmanier maar voor alle andere fields erbij ( ook tijd datum beschrijving)
//layout veranderen en afbeeldingen
//wss moeten links gezet worden tussen de backend