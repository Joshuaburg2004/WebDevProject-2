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
  const [isViewAllVisible, setIsViewAllVisible] = useState(false);
  const [isUpcomingVisible, setIsUpcomingVisible] = useState(true);

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

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return eventDate > currentDate;
  });

  return (
    <div>
      <h1>Events</h1>
      
      <button onClick={() => SetisAddEventVisible(!isAddEventVisible)}>
        {isAddEventVisible ? 'Close Add Event' : 'Add Event'}
      </button>

      <button onClick={() => setIsViewAllVisible(!isViewAllVisible)}>
        {isViewAllVisible ? 'Hide All Events' : 'View All Events'}
      </button>

      <button onClick={() => setIsUpcomingVisible(!isUpcomingVisible)}>
        {isUpcomingVisible ? 'Hide Upcoming Events' : 'View Upcoming Events'}
      </button>

      {isAddEventVisible && (
        <div className="AddEvent">
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

      {isViewAllVisible && (
        <div className="ViewAllEvents">
          <h2>All Events</h2>
          <ul style={{ padding: 0 }}>
            {events.map((event, index) => (
              <li
                key={index}
                style={{
                  listStyle: 'none',
                  margin: '10px 0',
                  borderBottom: '1px solid #ccc',
                  padding: '5px 0',
                }}
              >
                <p>
                  <strong>Event:</strong> {event.title} --- <strong>Date:</strong> {event.date} --- 
                  <strong>Description:</strong> {event.description} ---
                  <strong>Start Time:</strong> {event.start_time} -{' '}
                  <strong>End Time:</strong> {event.end_time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUpcomingVisible && (
        <div className="UpcomingEvents">
          <h2>Upcoming Events</h2>
          <ul style={{ padding: 0 }}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <li
                  key={index}
                  style={{
                    listStyle: 'none',
                    margin: '10px 0',
                    borderBottom: '1px solid #ccc',
                    padding: '5px 0',
                  }}
                >
                  <p>
                    <strong>Event:</strong> {event.title} --- <strong>Date:</strong> {event.date} --- 
                    <strong>Description:</strong> {event.description} ---
                    <strong>Start Time:</strong> {event.start_time} -{' '}
                    <strong>End Time:</strong> {event.end_time}
                  </p>
                </li>
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Eventsreact;
