import React, { useState } from 'react'

import '../styles/UserInfo.css'

export default function Order() {
    const [isInfo, setIsInfo] = useState(false)

    const toggleInfo = () => {
        setIsInfo(!isInfo)
    }

    return (
        <div className='order'>
            <div className='order-info'>
                <div className='order-id'>Order ID: #12345</div>
                <div className='order-date'>Date: 2023-11-01</div>
                <div className='order-status status--pending'>Status: Pending</div>
                <span className='show-details' onClick={toggleInfo}>View Details</span>
                <button class='order-cancel-btn'>Cancel this order</button>
            </div>

            {isInfo && (
                <div style={{marginLeft: 100 + 'px'}}>
                    <div className='order-items-details'>
                        <div>My Dress Up Darling - 10 - $20</div>
                        <div class='order-price'>Order Price: $20</div>
                    </div>
                </div>
            )}
        </div>
    )
}
