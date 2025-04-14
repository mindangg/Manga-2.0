import React, { useState } from 'react'

import '../styles/UserInfo.css'

import { useAuthContext } from '../hooks/useAuthContext'
import { useOrderContext } from '../hooks/useOrderContext'

export default function Order({ order }) {
    const { user } = useAuthContext()
    const { dispatch } = useOrderContext()

    const [isInfo, setIsInfo] = useState(false)

    const toggleInfo = () => {
        setIsInfo(!isInfo)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const cancelOrder = async () => {
        try {
            const confirmed = window.confirm("Are you sure you want to cancel your order?")
            if (!confirmed) 
                return

            const response = await fetch('http://localhost:4000/api/order/' + order._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: 'Canceled' })
            })
    
            if (!response.ok)
                return console.error('Failed to cancel order:', response.status)
    
            const json = await response.json()
            dispatch({type: 'UPDATE_ITEM', payload: json})
        }
        catch (error) {
            console.error('Failed to cancel order', error)
        }
    }

    return (
        <div className='order-history-item'>
            <div className='order-history-info'>
                <div>Order: {order && order.orderNumber}</div>
                <div>Date: {order && formatDate(order.createdAt)}</div>
                <div className={`order-history-status-${order.status}`}>Status: {order && order.status}</div>
                <span className='show-history-details' onClick={toggleInfo}>View Details</span>
                <button onClick={cancelOrder}>Cancel this order</button>
            </div>

            {isInfo && (
                <div className='order-history-details-container'>
                    <div className='order-history-details'>
                        <i class='fa-solid fa-xmark' onClick={toggleInfo}></i>
                        <h2>Order: {order && order.orderNumber}</h2>
                        <div>Customer: {order.userID && order.userID.fullname}</div>
                        <div>Phone number: {order.userID && order.userID.phone}</div>
                        <div>Address: {order.userID && order.userID.address}</div>
                        <h3>Items: </h3>
                        {order && order.items.map((o) => (
                            <div key={o && o._id}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <img src={`http://localhost:4000/${o && o.mangaID.cover1}`} alt="Product Image" />
                                    {o && o.mangaID.title}
                                </div>
                                <div>Quantity: {o && o.quantity} <span style={{marginLeft: '50px'}}>Order Price: ${o && o.price}</span></div>
                            </div>
                        ))}
                        <h3>Total: ${order && order.totalPrice}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}
