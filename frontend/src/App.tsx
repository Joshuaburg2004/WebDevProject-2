import React from 'react';
import { User, Users } from './accounts';
import {Userattendance} from './userattendance';
import logo from './logo.svg';
import './App.css';

export type HomeState = 
  "home" | ""


function App(): JSX.Element {
  return (
    <div>
      <Userattendance />
    </div>
  );
}

export default App;
