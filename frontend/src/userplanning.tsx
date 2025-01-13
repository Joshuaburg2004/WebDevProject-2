import React from 'react';
 
interface UserPlanning {
}
export const UserPlanning = (): JSX.Element => {
  return (
    
<div>
  please enter the following information to record your attendance planning 
  <h1>Attendance</h1>
  <div>
        Day: 
        <input
          type='date'
          />
        from:
        <input
          type='time'
        />
        to:  
        <input
          type='time'
        />
        on site or online:
        <input
          type='text'
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