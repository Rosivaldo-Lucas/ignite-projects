import { Outlet } from 'react-router-dom'

import './App.css';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container-dark ${theme === 'light' ? 'container-light' : ''}`}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
