import React, { useState, useEffect } from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Admin.css'

import AdminLogin from './AdminLogin'
import AdminOrder from './AdminOrder'
import AdminUser from './AdminUser'
import AdminProduct from './AdminProduct'
import AdminEmployee from './AdminEmployee'
import AdminSupplier from './AdminSupplier'
import AdminUserStatistic from './AdminUserStatistic'
import AdminStockStatistic from './AdminStockStatistic'
import AdminOrderStatistic from './AdminOrderStatistic'

import { useAdminContext } from '../hooks/useAdminContext'
import { useAdminLogout } from '../hooks/useAdminLogout'

export default function Admin() {
    const { admin } = useAdminContext()
    const { logout } = useAdminLogout()

    const [toggle, setToggle] = useState('')

    const permissions = admin?.employee?.role?.permissions || []
    const accessibleFunctions = permissions.map(p => p.function)

    // Define functionMap OUTSIDE so it can be reused
    const functionMap = {
        'product': 'Product',
        'supplier': 'Supplier',
        'user': 'User',
        'order': 'Order',
        'employee': 'Employee',
        'user-statistic': 'User Statistic',
        'order-statistic': 'Order Statistic',
        'stock-statistic': 'Stock Statistic'
    }

    const canAccess = (page) => {
        return accessibleFunctions.includes(functionMap[page])
    }

    useEffect(() => {
        if (!canAccess(toggle) && accessibleFunctions.length > 0) {
            // Find first accessible page
            const firstAccessiblePage = Object.keys(functionMap).find(page => canAccess(page))
            if (firstAccessiblePage) {
                setToggle(firstAccessiblePage)
            }
        }
    }, [admin, permissions])

    if (!admin) {
        return <AdminLogin />
    }

    return (
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
                            {canAccess('user-statistic') && <li className={toggle === 'user-statistic' ? 'active' : ''} onClick={() => setToggle('user-statistic')}><i className='fa-solid fa-chart-simple'></i> User Statistic</li>}
                            {canAccess('order-statistic') && <li className={toggle === 'order-statistic' ? 'active' : ''} onClick={() => setToggle('order-statistic')}><i className='fa-solid fa-chart-simple'></i> Order Statistic</li>}
                            {canAccess('stock-statistic') && <li className={toggle === 'stock-statistic' ? 'active' : ''} onClick={() => setToggle('stock-statistic')}><i className='fa-solid fa-chart-simple'></i> Stock Statistic</li>}
                        </ul>
                    </div>
                </div>

                <div className='bottomnav'>
                    <ul>
                        <li><i className="fa-solid fa-pen-ruler" style={{paddingTop: '0px'}}></i> {admin?.employee?.role?.name}</li>
                        <li><i className='fa-regular fa-circle-user'></i> {admin?.employee?.fullname}</li>
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
                {toggle === 'user-statistic' && canAccess('user-statistic') && <AdminUserStatistic />}
                {toggle === 'order-statistic' && canAccess('order-statistic') && <AdminOrderStatistic />}
                {toggle === 'stock-statistic' && canAccess('stock-statistic') && <AdminStockStatistic />}
            </div>
        </div>
    )
}
