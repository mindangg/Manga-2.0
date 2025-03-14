import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'


import '../styles/Admin.css'






import AdminLogin from './AdminLogin'
import AdminOrder from './AdminOrder'
import AdminUser from './AdminUser'
import AdminProduct from './AdminProduct'

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
                <AdminOrder/>
            </div>
        </div>
    )
}
