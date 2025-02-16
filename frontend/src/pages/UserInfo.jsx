import React from 'react'
import { useLogout } from '../hooks/useLogout'

import '../styles/UserInfo.css'

import Order from '../components/Order'

export default function UserInfo() {
    const { logout } = useLogout()

    return (
        <>
            <div id='user__info'>
                <ul className='nav'>
                    <div>
                        <li>Orders</li>
                        <li>User Info</li> 
                    </div>
                    <li onClick={() => logout()}>Logout</li> 
                </ul>
            </div>

            <div id='order__container'>
                <h2>Your Order History</h2>
                <div className='order__history'>
                    <Order/>
                    <Order/>
                    <Order/>
                </div>
            </div>
        </>
    )
}
