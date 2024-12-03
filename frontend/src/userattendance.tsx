import React from 'react';
 
export const Userattendance = (): JSX.Element => {
  return (
    
<div>
  <h1>Attendance</h1>
  <div>
        Day: 
        <input
          type='text'
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
        <button>
            Submit
        </button>
      </div>
    </div>
  );
}
 
export default Userattendance;