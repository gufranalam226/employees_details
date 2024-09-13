import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Header from './components/Headers/Headers.jsx'
import {Routes, Route} from 'react-router-dom'


function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />      
      </Routes>
    </>
  )
}

export default App
