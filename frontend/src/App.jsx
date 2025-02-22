import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import UserInfo from './pages/UserInfo' 

// components
import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'
import CardDetails from './components/CardDetails'

const Layout = () => {
  const hideLayout = useLocation().pathname === '/admin'
  const { user } = useAuthContext()

  return (
    <div className='App'>
      {!hideLayout && <Header/>}
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/user-info' element={user ? <UserInfo/> : <Navigate to='/'/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </div>
      <Notification/>
      <CardDetails/>
      {!hideLayout && <Footer/>}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
