import React, { useState } from 'react';

export const Eventsreact = (): JSX.Element => {
  const [newEvent, setNewEvent] = useState(''); // Voor de input
  const [events, setEvents] = useState<string[]>([]); // Voor de lijst met evenementen

  const HandleAddEvent = () => {
    if(newEvent.trim() !== '') {
      setEvents([...events,newEvent]);
      setNewEvent('');
    }
  }
  return (
    <div>
      <h1>Events</h1>
      
      <h2>Add event</h2>
      <input
        type="text"
        value={newEvent}
        placeholder="Add new event"
        onChange={(e) => setNewEvent(e.target.value)}
      />
      <button onClick={HandleAddEvent}>Add New Event</button>     
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default Eventsreact;
