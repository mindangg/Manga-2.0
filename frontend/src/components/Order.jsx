import React, { useEffect, useState } from 'react'

import test from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'

import '../styles/UserInfo.css'

export default function Order({ order }) {
    const [isInfo, setIsInfo] = useState(false)
    console.log('order', order.orderNumber)
    const toggleInfo = () => {
        setIsInfo(!isInfo)
    }

    return (
        <div className='order-history-item'>
            <div className='order-history-info'>
                <div>Order: {order.orderNumber}</div>
                <div>Date: 2023-11-01</div>
                <div className='order-history-status-pending'>Status: Pending</div>
                <span className='show-history-details' onClick={toggleInfo}>View Details</span>
                <button>Cancel this order</button>
            </div>

            {/* {isInfo && (
                <div style={{marginLeft: 100 + 'px'}}>
                    <div className='order-history-details'>
                        <div>My Dress Up Darling - 10 - $20</div>
                        <div class='order-history-total'>Order Price: $20</div>
                    </div>
                </div>
            )} */}
            {isInfo && (
                <div className='order-history-details-container'>
                    <div className='order-history-details'>
                        <i class='fa-solid fa-xmark' onClick={toggleInfo}></i>
                        <h2>Order: 12345</h2>
                        <div>Customer: Tran Minh Dang</div>
                        <div>Phone number: 0901234567</div>
                        <div>Address: 123 An Duong Vuong p12 Quan 05</div>
                        <h3>Items: </h3>
                        <div><img src={test}></img> My Dress Up Darling - Volume 01</div>
                        <div>Quantity: 10 Order Price: $20</div>

                        <h3>Total: $190</h3>
                    </div>
                </div>
            )}
        </div>
    )
}
