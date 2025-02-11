import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'

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
            <Route 
              path="/login" 
              element={<Login/>} 
            />
            <Route 
              path="/signup" 
              element={<Signup/>} 
            />
            <Route 
              path="/cart" 
              element={<Cart/>} 
            />
          </Routes>
        </div>

      </BrowserRouter>

      <Footer/>
    </div>
  )
}
