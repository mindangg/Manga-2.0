import React, { useEffect, useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'

import '../styles/Admin.css'

import AdminLogin from './AdminLogin'
import AdminOrder from './AdminOrder'
import AdminUser from './AdminUser'
import AdminProduct from './AdminProduct'
import AdminEmployee from './AdminEmployee'
import AdminSupplier from './AdminSupplier'
import AdminStockStatistic from './AdminStockStatistic'

import { useAdminContext } from '../hooks/useAdminContext'
import { useAdminLogout } from '../hooks/useAdminLogout'

export default function Admin() {
    const { admin } = useAdminContext()
    const { logout } = useAdminLogout()

    const [toggle, setToggle] = useState('product')

    return admin ? (
        <div>
            <div className='sidenav'>
                <div className='ok'>
                    <div className='topnav'>
                        <img src={logo} alt='Logo' />
                    </div>
                    <div className='middlenav'>
                        <ul>
                            <li onClick={() => setToggle('product')}><i className='fa-solid fa-book'></i> Product</li>
                            <li onClick={() => setToggle('supplier')}><i class='fa-solid fa-truck-field'></i> Supplier</li>
                            <li onClick={() => setToggle('user')}><i className='fa-solid fa-users'></i> User</li>
                            <li onClick={() => setToggle('order')}><i className='fa-solid fa-basket-shopping'></i> Order</li>
                            <li onClick={() => setToggle('employee')}><i class='fa-solid fa-user-tie'></i> Employee</li>
                            <li onClick={() => setToggle('statistic')}><i className='fa-solid fa-chart-simple'></i> Statistic</li>
                        </ul>
                    </div>
                </div>
                <div className='bottomnav'>
                    <ul>
                        <li><i className='fa-regular fa-circle-user'></i> {admin && admin.employee.role}</li>
                        <li><i class='fa-solid fa-phone'></i> {admin && admin.employee.phone}</li>
                        <li onClick={logout}><i className='fa-solid fa-arrow-right-from-bracket'></i> Logout</li>
                    </ul>
                </div>
            </div>

            <div className='content'>
                {toggle === 'product' ? (
                    <AdminProduct/>
                ) : toggle === 'supplier' ? (
                    <AdminSupplier/>
                ) : toggle === 'user' ? (
                    <AdminUser/>
                ) : toggle === 'order' ? (
                    <AdminOrder/>
                ) : toggle === 'employee' ? (
                    <AdminEmployee/>
                ) : toggle === 'statistic' ? (
                    <AdminStockStatistic/>
                ) : null}
            </div>

        </div>
    ) : (
        <AdminLogin />
    )
}

