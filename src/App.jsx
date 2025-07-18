import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Crypto from './pages/Crypto'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crypto/:cryptoId' element={<Crypto />} />
      </Routes>
    </div>
  )
}

export default App