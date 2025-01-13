import React, { useState } from "react";

interface Attendance {
  id: string;
  user_id: string;
  date: string;
}

const AttendanceApp: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [userId, setUserId] = useState("");

  const addAttendance = () => {
    const newAttendance: Attendance = {
      id: crypto.randomUUID(),
      user_id: userId,
      date: new Date().toISOString().split("T")[0],
    };
    setAttendances([...attendances, newAttendance]);
    setUserId("");
  };

  const deleteAttendance = (id: string) => {
    setAttendances(attendances.filter((attendance) => attendance.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Attendance Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Add Attendance</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={addAttendance} style={{ padding: "5px 10px" }}>
          Add
        </button>
      </div>

      <div>
        <h2>Attendance List</h2>
        {attendances.length === 0 ? (
          <p>No attendances recorded.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {attendances.map((attendance) => (
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
                  <strong>User ID:</strong> {attendance.user_id}
                </p>
                <p>
                  <strong>Date:</strong> {attendance.date}
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

export default AttendanceApp;
