import React, { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout'

import '../styles/UserInfo.css'

import Order from '../components/Order'

import { useAuthContext } from '../hooks/useAuthContext'
import { useOrderContext } from '../hooks/useOrderContext'

export default function UserInfo() {
    const { logout } = useLogout()
    const { user, dispatch } = useAuthContext()
    const { order, dispatch: orderDispatch } = useOrderContext()

    const [isOrder, setIsOrder] = useState(true)
    const [isUser, setIsUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
 
    const [fullname, setFullName] = useState(user.user.fullname)
    const [phone, setPhone] = useState(user.user.phone)
    const [address, setAddress] = useState(user.user.address)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://localhost:4000/api/user/' + user.user.id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            console.log(json)

            if (response.ok) {
                dispatch({ type: 'LOGIN', payload: json })
            }
        }

        fetchUser()

        console.log(user)
    }, [])

    useEffect(() => {
        console.log(user.user.address)
    }, [])
    
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

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch('http://localhost:4000/api/order/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            console.log(json)

            if (response.ok) {
                orderDispatch({ type: 'DISPLAY_ITEM', payload: json })
            }
        }

        fetchOrder()

    }, [])

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
                body: JSON.stringify({ fullname, phone, address })
            })

            const json = await response.json()
    
            if (response.ok) {
                console.log(json)
                console.log(user.user.address)
                dispatch({ type: 'SET_USER', payload: json })
                setIsLoading(false)
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
                    <li onClick={() => logout()}>Logout</li> 
                </ul>
            </div>

            {isOrder 
            ? (
                <div id='order-history-container'>
                    <h2>Your Order History</h2>
                    <div className='order-history'>
                        {order?.map((o) => {
                            <Order key={o._id} order={o}/>
                        })}
                    </div>
                </div>
            ) : (
                <div id='user-container'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h2>Edit user info</h2>
                        <p>Please fill in the information below:</p>
                            <div>
                                <input type='text' placeholder='Fullname' value={fullname} 
                                    onChange={(e) => setFullName(e.target.value)}></input>
                            </div>
                            <div class='user-info__input'>
                                <input type='text' placeholder='Phone number' value={phone}
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
