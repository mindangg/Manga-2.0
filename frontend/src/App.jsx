import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import UserInfo from './pages/UserInfo' 

// components
import Header from './components/Header'
import Footer from './components/Footer'


export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div className='pages'>
          <Routes>
            <Route 
              path='/' 
              element={<Home/>} 
            />
            <Route 
              path='/login' 
              element={<Login/>} 
            />
            <Route 
              path='/signup' 
              element={<Signup/>} 
            />
            <Route 
              path='/product' 
              element={<Product/>} 
            />
            <Route 
              path='/user-info' 
              element={<UserInfo/>} 
            />
            <Route 
              path='/cart' 
              element={<Cart/>} 
            />
            <Route 
              path='/checkout' 
              element={<Checkout/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>

      <Footer/>
    </div>
  )
}
