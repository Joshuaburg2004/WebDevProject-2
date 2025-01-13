import React, { useState } from 'react';
 
interface UserPlanning {
  day: string;
  from: string;
  to: string;
  location: string;
}

export const UserPlanning = (): JSX.Element => {
    const [newplanning, setNewPlanning] = useState<UserPlanning>({
      day: '',
      from: '',
      to: '',
      location: '',
    });
  
  return (
    
<div>
  please enter the following information to record your attendance planning 
  <h1>Attendance</h1>
  <div>
        Day: 
        <input
          type='date'
          value={newplanning.day}
          />
        from:
        <input
          type='time'
          value={newplanning.from}
        />
        to:  
        <input
          type='time'
          value={newplanning.to}
        />
        on site or online:
        <input
          type='text'
          value={newplanning.location}
          placeholder='Location'
        />
      </div>
      <div>
        <button
        onClick={_ => ""}>
            Submit
        </button>
      </div>
    </div>
  );
}
 
export default UserPlanning;