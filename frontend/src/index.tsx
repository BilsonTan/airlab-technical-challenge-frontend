import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AircraftTrajectoriesApp } from './AircraftTrajectoriesApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<AircraftTrajectoriesApp />);
