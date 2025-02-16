import React from 'react'

import '../styles/UserInfo.css'

export default function components() {
    return (
        <div className='order'>
            <div className='order__info'>
                <div className="order__id">Order ID: #12345</div>
                <div className="order__date">Date: 2023-11-01</div>
                <div className="order__status status--pending">Status: Pending</div>
                <span className="show__details">View Details</span>
                <button class="order__cancel-btn">Cancel this order</button>
            </div>
            <div style={{marginLeft: 100 + 'px'}}>
                <div className="order__items__details">
                    <div>My Dress Up Darling - 10 - $20</div>

                    <div class="order__price">Order Price: $20</div>
                </div>
            </div>
        </div>
    )
}
