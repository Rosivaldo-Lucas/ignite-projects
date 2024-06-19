import { Outlet } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className='container-main'>
      <Outlet />
    </div>
  )
}

export default App
