import React from 'react'

import '../styles/Admin.css'

export default function OrderCard() {
    return (
        <div className='order-info'>
            <span>1</span>
            <span>mindang@gmail.com</span>
            <span>19/05/2005</span>
            <span>$ 90.00</span>
            <span className='order-status-pending'>Pending</span>
            <span className='order-action'>
                <i className="fa-solid fa-eye"></i>
                Details
            </span>
        </div>
    )
}
