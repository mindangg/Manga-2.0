import React from 'react'

import '../styles/Admin.css'

export default function OrderCard({ order }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
    }

    return (
        <div className='order-info'>
            <span>{order.orderNumber}</span>
            <span>{order.userID}</span>
            <span>{formatDate(order.createdAt)}</span>
            <span>$ {order.totalPrice}</span>
            <span className='order-status-pending'>{order.status}</span>
            <span className='order-action'>
                <i className="fa-solid fa-eye"></i>
                Details
            </span>
        </div>
    )
}
