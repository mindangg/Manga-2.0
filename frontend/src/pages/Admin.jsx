import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'


import '../styles/Admin.css'

import UserCard from '../components/UserCard'
import MangaCard from '../components/MangaCard'
import OrderCard from '../components/OrderCard'
import AddProduct from '../components/AddProduct'

import AdminLogin from './AdminLogin'

import AddUser from '../components/AddUser'


export default function Admin() {


    return (
        // <AdminLogin/>
        <div>
            <div className='sidenav'>
                <div className='ok'>
                    <div className='topnav'>
                        <img src={logo}></img>
                    </div>
                    <div className='middlenav'>
                        <ul>
                            <li>
                                <div><i className='fa-solid fa-book'></i></div>
                                <div>Product</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-users'></i></div>
                                <div>User</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-basket-shopping'></i></div>
                                <div>Order</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-chart-simple'></i></div>
                                <div>Statistic</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='bottomnav'>
                    <ul>
                        <li>
                            <div><i className='fa-solid fa-chevron-left'></i></div>
                            <div>Home</div>
                        </li>
                        <li>
                            <div><i className='fa-regular fa-circle-user'></i></div>
                            <div>Admin</div>
                        </li>
                        <li>
                            <div><i className='fa-solid fa-arrow-right-from-bracket'></i></div>
                            <div>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='content'>
            <AddUser/>
            
            {/* <div className='order-container'>
                <div className='order-header'>
                    <span>Order</span>
                    <span>Customer</span>
                    <span>Order Date</span>
                    <span>Total</span>
                    <span>Status</span>
                    <span>Details</span>
                </div>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </div> */}
                
                {/* <div className='manga-container'>
                    <div className='manga-header'>
                        <span>Cover</span>
                        <span>Title</span>
                        <span>Category</span>
                        <span>Author</span>
                        <span>Stock</span>
                        <span>Price</span>
                        <span>Edit</span>
                    </div>
                    
                    <MangaCard/>
                    <MangaCard/>
                    <MangaCard/>
                </div> */}

                {/* <div className='user-container'>
                    <div className='user-header'>
                        <span>Full Name</span>
                        <span>Username</span>
                        <span>Email</span>
                        <span>Phone Number</span>
                        <span>Address</span>
                        <span>Date Created</span>
                        <span>Status</span>
                        <span>Edit</span>
                    </div>

                    <UserCard/>
                    <UserCard/>
                    <UserCard/>
                </div> */}
            </div>
        </div>
    )
}
