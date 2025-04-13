import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import UserInfo from './pages/UserInfo' 

import Admin from './pages/Admin'
import AdminProduct from './pages/AdminProduct'
import AdminSupplier from './pages/AdminSupplier'
import AdminUser from './pages/AdminUser'
import AdminOrder from './pages/AdminOrder'
import AdminEmployee from './pages/AdminEmployee'
import AdminOrderStatistic from './pages/AdminOrderStatistic'
import AdminStockStatistic from './pages/AdminStockStatistic'

// components
import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'
import CardDetails from './components/CardDetails'

import ScrollToTop from './components/ScrollToTop'

const Layout = () => {
  const hideLayout = useLocation().pathname === '/admin'
  const { user } = useAuthContext()

  return (
    <div className='App'>
      {!hideLayout && <Header/>}
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/user-info' element={user ? <UserInfo/> : <Navigate to='/'/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>

          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/product' element={<AdminProduct/>}/>
          <Route path='/admin/supplier' element={<AdminSupplier/>}/>
          <Route path='/admin/user' element={<AdminUser/>}/>
          <Route path='/admin/order' element={<AdminOrder/>}/>
          <Route path='/admin/employee' element={<AdminEmployee/>}/>
          <Route path='/admin/order-statistic' element={<AdminOrderStatistic/>}/>
          <Route path='/admin/stock-statistic' element={<AdminStockStatistic/>}/>
        </Routes>
      </div>
      <Notification/>
      <CardDetails/>
      {!hideLayout && <Footer/>}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Layout />
    </BrowserRouter>
  )
}
