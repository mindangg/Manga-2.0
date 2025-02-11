import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

// pages
import Home from './pages/Home'
// components
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home/>} 
            />
          </Routes>
        </div>

      </BrowserRouter>

      <Footer/>
    </div>
  )
}
