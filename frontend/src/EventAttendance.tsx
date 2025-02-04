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

interface Attendance {
  event: Event;
  attendees: {
    name: string;
    rating: number;
    feedback: string;
  }[];
}

const EventAttendancePage = ({ events }: { events: Event[] }): JSX.Element => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  // Handle adding attendance for an event
  const handleAddAttendance = (event: Event, attendeeName: string) => {
    const eventIndex = attendance.findIndex((att) => att.event.title === event.title);

    if (eventIndex >= 0) {
      // Update existing event attendance
      const updatedAttendance = [...attendance];
      updatedAttendance[eventIndex].attendees.push({
        name: attendeeName,
        rating: 0,
        feedback: '',
      });
      setAttendance(updatedAttendance);
    } else {
      // Add a new event with its first attendee
      setAttendance([
        ...attendance,
        {
          event,
          attendees: [{ name: attendeeName, rating: 0, feedback: '' }],
        },
      ]);
    }
  };

  // Handle updating rating and feedback for an attendee
  const handleUpdateFeedback = (event: Event, attendeeName: string, rating: number, feedback: string) => {
    const updatedAttendance = attendance.map((att) => {
      if (att.event.title === event.title) {
        return {
          ...att,
          attendees: att.attendees.map((attendee) =>
            attendee.name === attendeeName ? { ...attendee, rating, feedback } : attendee
          ),
        };
      }
      return att;
    });
    setAttendance(updatedAttendance);
  };

  return (
    <div>
      <h1>Event Attendance</h1>

      {/* Display events with options to add attendance */}
      <h2>Events</h2>
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
              <strong>Event:</strong> {event.title} --- <strong>Date:</strong> {event.date}
            </p>
            <button
              onClick={() => {
                const attendeeName = prompt(`Enter attendee name for event: ${event.title}`);
                if (attendeeName) handleAddAttendance(event, attendeeName);
              }}
            >
              Add Attendee
            </button>
          </li>
        ))}
      </ul>

      {/* Display attendance per event */}
      <h2>Attendance Records</h2>
      {attendance.length > 0 ? (
        attendance.map((att, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{att.event.title}</h3>
            <ul style={{ padding: 0 }}>
              {att.attendees.map((attendee, idx) => (
                <li
                  key={idx}
                  style={{
                    listStyle: 'none',
                    margin: '10px 0',
                    borderBottom: '1px solid #ccc',
                    padding: '5px 0',
                  }}
                >
                  <p>
                    <strong>Attendee:</strong> {attendee.name} --- <strong>Rating:</strong> {attendee.rating} ---{' '}
                    <strong>Feedback:</strong> {attendee.feedback || 'No feedback yet'}
                  </p>
                  <button
                    onClick={() => {
                      const rating = parseInt(prompt(`Enter rating for ${attendee.name}`) || '0', 10);
                      const feedback = prompt(`Enter feedback for ${attendee.name}`);
                      if (feedback !== null) {
                        handleUpdateFeedback(att.event, attendee.name, rating, feedback);
                      }
                    }}
                  >
                    Add/Update Feedback
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No attendance records yet.</p>
      )}
    </div>
  );
};

export default EventAttendancePage;
