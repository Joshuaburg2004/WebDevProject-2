import React, { useState } from "react";

// Define the Event_Attendance structure
interface EventAttendance {
  id: string;
  user_id: string;
  event_id: string;
  rating?: number;
  feedback?: string;
}

// Define the Event structure
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  admin_approval: boolean;
}

// Define the User structure
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const EventAttendancePage: React.FC = () => {
  // Sample events and users
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Workshop 1",
      description: "Learn React Basics",
      date: "2025-01-20",
      location: "Room 101",
      admin_approval: true,
    },
    {
      id: "2",
      title: "Workshop 2",
      description: "Advanced React Patterns",
      date: "2025-01-22",
      location: "Room 102",
      admin_approval: true,
    },
  ]);

  const [users] = useState<User[]>([
    { id: "1", first_name: "John", last_name: "Doe", email: "john@example.com" },
    { id: "2", first_name: "Jane", last_name: "Smith", email: "jane@example.com" },
  ]);

  // Event Attendance State
  const [eventAttendance, setEventAttendance] = useState<EventAttendance[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState("");

  // Add attendance record
  const addAttendance = () => {
    if (!selectedEventId || !selectedUserId) {
      alert("Please select an event and a user.");
      return;
    }

    const newAttendance: EventAttendance = {
      id: `${eventAttendance.length + 1}`, // Auto-generate unique ID
      user_id: selectedUserId,
      event_id: selectedEventId,
      rating,
      feedback,
    };

    setEventAttendance([...eventAttendance, newAttendance]);

    // Clear fields
    setSelectedUserId(null);
    setRating(undefined);
    setFeedback("");
  };

  // Delete attendance record
  const deleteAttendance = (id: string) => {
    setEventAttendance(eventAttendance.filter((attendance) => attendance.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Event Attendance</h1>

      {/* Event Selection */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Select Event</h2>
        <select
          value={selectedEventId || ""}
          onChange={(e) => setSelectedEventId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="" disabled>
            Select an event
          </option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {/* User Selection */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Select User</h2>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
      </div>

      {/* Rating and Feedback */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Provide Feedback</h2>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating || ""}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ marginRight: "10px", padding: "5px" }}
          min="1"
          max="5"
        />
        <input
          type="text"
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={addAttendance} style={{ padding: "5px 10px" }}>
          Add Attendance
        </button>
      </div>

      {/* Attendance Records */}
      <div>
        <h2>Attendance Records</h2>
        {eventAttendance.length === 0 ? (
          <p>No attendance records yet.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {eventAttendance.map((attendance) => (
              <li
                key={attendance.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Event:</strong>{" "}
                  {events.find((event) => event.id === attendance.event_id)?.title || "Unknown"}
                </p>
                <p>
                  <strong>User:</strong>{" "}
                  {users.find((user) => user.id === attendance.user_id)?.first_name || "Unknown"}{" "}
                  {users.find((user) => user.id === attendance.user_id)?.last_name || ""}
                </p>
                <p>
                  <strong>Rating:</strong> {attendance.rating || "N/A"}
                </p>
                <p>
                  <strong>Feedback:</strong> {attendance.feedback || "No feedback provided"}
                </p>
                <button
                  onClick={() => deleteAttendance(attendance.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventAttendancePage;
