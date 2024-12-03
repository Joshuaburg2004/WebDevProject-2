import logo from './logo.svg';
import React, { useState } from 'react'; 
import './App.css';

function App() {
  const [events, setEvents] = useState([]); //opslag
  const [newEvent, setNewEvent] = useState(''); //opslag

  const addEvent = () => {
    if(newEvent.trim()) {
      setEvents([...events,newEvent]);
      setNewEvent('');
    }
  }
  
  return (
    <div>
      <h1>Events</h1>
      <h3>Add new event</h3>

      {}
      <input
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="Enter new event"
      />

      {}
      <button onClick={addEvent}>Add Event</button>

      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>

      <h3>View all events</h3>
      
      <h4 style={{ margin: 0, padding: 0 }}>Monday:</h4>
      <h4 style={{ margin: 0, padding: 0 }}>Tuesday:</h4>
      <h4 style={{ margin: 0, padding: 0 }}>Wednesday:</h4>
      <h4 style={{ margin: 0, padding: 0 }}>Thursday:</h4>
      <h4 style={{ margin: 0, padding: 0 }}>Friday:</h4>
      
      {/* <h4>Monday</h4>
      <h4>Tuesday</h4>
      <h4>Wednesday</h4>
      <h4>Thursday</h4>
      <h4>Friday</h4> */}
    </div>
  );
}

export default App;

//npm start
//4