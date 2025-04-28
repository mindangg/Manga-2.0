import React, { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout'

import '../styles/UserInfo.css'

import Order from '../components/Order'

import { useAuthContext } from '../hooks/useAuthContext'
import { useOrderContext } from '../hooks/useOrderContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export default function UserInfo() {
    const { logout } = useLogout()
    const { user, dispatch } = useAuthContext()
    const { order, dispatch: orderDispatch } = useOrderContext()

    const [isOrder, setIsOrder] = useState(true)
    const [isUser, setIsUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { showNotification } = useNotificationContext()

    const [userCurrent, setUserCurrent] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const fetchUser = async () => {
        const response = await fetch('http://localhost:4000/api/user/' + user.user._id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)

        if (response.ok) {
            setUserCurrent(json)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [])
    
    useEffect(() => {
        if (userCurrent) {
            setUsername(userCurrent.username)
            setEmail(userCurrent.email)
            setPhone(userCurrent.phone)
            setAddress(userCurrent.address)
        }
    }, [userCurrent])    
    
    const toggleOrder = () => {
        if (!isOrder) {
            setIsOrder(!isOrder)
            setIsUser(!isUser)
        }
    }

    const toggleUser = () => {
        if (!isUser) {
            setIsOrder(!isOrder)
            setIsUser(!isUser)
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/order/' + user.user._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching order:', response.status)

            const json = await response.json()        

            orderDispatch({ type: 'DISPLAY_ITEM', payload: json })
        }
        catch (error) {
            console.error('Error fetching order:', error)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [orderDispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:4000/api/user/' + user.user._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ username, email, phone, address })
            })
    
            if (response.ok) {
                fetchUser()
                setIsLoading(false)
                showNotification('Update user info succesfully')
            }
        }
        catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <>
            <div id='user-info'>
                <ul className='nav'>
                    <div>
                        <li onClick={toggleOrder}>Orders</li>
                        <li onClick={toggleUser}>User Info</li> 
                    </div>
                    <li onClick={logout}>Logout</li> 
                </ul>
            </div>

            {isOrder 
            ? (
                <div id='order-history-container'>
                    <h2>Your Order History</h2>
                    <div className='order-history'>
                        {order && order.map((o) => (
                            <Order key={o._id} order={o} fetchOrder={fetchOrder}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div id='user-container'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h2>Edit user info</h2>
                            <div class='user-info__input'>
                                <input type='text' placeholder='Username' value={username}
                                    onChange={(e) => setUsername(e.target.value)}></input>
                            </div>
                            <div class='user-info__input'>
                                <input type='text' placeholder='Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div class='user-info__input'>
                                <input type='tel' placeholder='Phone number' value={phone}
                                    onChange={(e) => setPhone(e.target.value)}></input>
                            </div>
                            <div class='user-info__input'>
                                <input type='text' placeholder='Address' value={address}
                                    onChange={(e) => setAddress(e.target.value)}></input>
                            </div>
                            <button type='submit' disabled={isLoading}>Save user info</button>
                    </form>
                </div>
            )}
        </>
    )
}
