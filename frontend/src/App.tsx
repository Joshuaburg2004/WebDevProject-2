import React from 'react';
import { Users } from './accounts';
import { HomePage, HomeView, User } from './home';
import { Userattendance } from './userattendance';
import logo from './logo.svg';
import './App.css';


function App(): JSX.Element {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;