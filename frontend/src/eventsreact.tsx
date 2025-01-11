import React, {useState} from 'react';
 
export const Eventsreact = (): JSX.Element => {
    const [newEvent, setNewEvent] = useState('');
  return (
    <div>
    <h1>Events</h1>
    <h2>Add event</h2>

    {}
    <input
    
        type="text"
        value={newEvent}
        placeholder="Add new event" //empty placeholder
    
    />

    {}
    <button>Add new event</button>
    

    <h4 style={{ margin: 0, padding: 0 }}>Monday:</h4>
    <h4 style={{ margin: 0, padding: 0 }}>Tuesday:</h4>
    <h4 style={{ margin: 0, padding: 0 }}>Wednesday:</h4>
    <h4 style={{ margin: 0, padding: 0 }}>Thursday:</h4>
    <h4 style={{ margin: 0, padding: 0 }}>Friday:</h4>
    
    </div>
  );
}
 
export default Eventsreact;

//comment voor push ff !
