import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Admin.css'

import AdminLogin from './AdminLogin'
import AdminOrder from './AdminOrder'
import AdminUser from './AdminUser'
import AdminProduct from './AdminProduct'
import AdminEmployee from './AdminEmployee'
import AdminSupplier from './AdminSupplier'
import AdminStockStatistic from './AdminStockStatistic'
import AdminOrderStatistic from './AdminOrderStatistic'

import { useAdminContext } from '../hooks/useAdminContext'
import { useAdminLogout } from '../hooks/useAdminLogout'

export default function Admin() {
    const { admin } = useAdminContext()
    const { logout } = useAdminLogout()
    
    const [toggle, setToggle] = useState('')
    const role = admin?.employee?.role

    const accessMap = {
        'Seller': ['order', 'order-statistic'],
        'Stocker': ['product', 'supplier', 'stock-statistic'],
        'Admin': ['user', 'employee'],
        'Manager': ['product', 'supplier', 'user', 'order', 'employee', 'order-statistic', 'stock-statistic']
    }
    
    const accessiblePages = accessMap[role] || []
    const canAccess = (page) => accessiblePages.includes(page)
    
    if (!canAccess(toggle) && accessiblePages.length > 0) {
        setToggle(accessiblePages[0])
    }

    return admin ? (
        <div>
            <div className='sidenav'>
                <div className='ok'>
                    <div className='topnav'>
                        <img src={logo} alt='Logo' />
                    </div>
                    <div className='middlenav'>
                        <ul>
                            {canAccess('product') && <li className={toggle === 'product' ? 'active' : ''} onClick={() => setToggle('product')}><i className='fa-solid fa-book'></i> Product</li>}
                            {canAccess('supplier') && <li className={toggle === 'supplier' ? 'active' : ''} onClick={() => setToggle('supplier')}><i className='fa-solid fa-truck-field'></i> Supplier</li>}
                            {canAccess('user') && <li className={toggle === 'user' ? 'active' : ''} onClick={() => setToggle('user')}><i className='fa-solid fa-users'></i> User</li>}
                            {canAccess('order') && <li className={toggle === 'order' ? 'active' : ''} onClick={() => setToggle('order')}><i className='fa-solid fa-basket-shopping'></i> Order</li>}
                            {canAccess('employee') && <li className={toggle === 'employee' ? 'active' : ''} onClick={() => setToggle('employee')}><i className='fa-solid fa-user-tie'></i> Employee</li>}
                            {canAccess('order-statistic') && <li className={toggle === 'order-statistic' ? 'active' : ''} onClick={() => setToggle('order-statistic')}><i className='fa-solid fa-chart-simple'></i> Order Statistic</li>}
                            {canAccess('stock-statistic') && <li className={toggle === 'stock-statistic' ? 'active' : ''} onClick={() => setToggle('stock-statistic')}><i className='fa-solid fa-chart-simple'></i> Stock Statistic</li>}
                        </ul>
                    </div>
                </div>
                <div className='bottomnav'>
                    <ul>
                        <li><i className='fa-regular fa-circle-user'></i> {role}</li>
                        <li><i className='fa-solid fa-phone'></i> {admin?.employee?.phone}</li>
                        <li onClick={logout}><i className='fa-solid fa-arrow-right-from-bracket'></i> Logout</li>
                    </ul>
                </div>
            </div>

            <div className='content'>
                {toggle === 'product' && canAccess('product') && <AdminProduct />}
                {toggle === 'supplier' && canAccess('supplier') && <AdminSupplier />}
                {toggle === 'user' && canAccess('user') && <AdminUser />}
                {toggle === 'order' && canAccess('order') && <AdminOrder />}
                {toggle === 'employee' && canAccess('employee') && <AdminEmployee />}
                {toggle === 'order-statistic' && canAccess('order-statistic') && <AdminOrderStatistic />}
                {toggle === 'stock-statistic' && canAccess('stock-statistic') && <AdminStockStatistic />}
            </div>
        </div>
    ) : (
        <AdminLogin />
    )
}
