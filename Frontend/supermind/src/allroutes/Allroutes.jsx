import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    
    </Routes>
  )
}

export default Allroutes