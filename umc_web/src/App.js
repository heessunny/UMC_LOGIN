import React from 'react';
import { useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginComponent from './component/LoginComponent';
import MyPage from './component/MyPage';

function App() {
  const user = useSelector(state => state.user);


  return (
    <div className='App'>
      {user.id !== "" ? <MyPage /> : <LoginComponent />}
    </div>
  )
}

export default App