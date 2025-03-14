import React from 'react'

import '../styles/Admin.css'

import OrderCard from '../components/OrderCard'

export default function AdminOrder() {
    return (
        <div className='order-container'>
            <div className = 'order-controller'>
                <select id='option'>
                    <option value='all'>All</option>
                    <option value='pending'>Pending</option>
                    <option value='delivered'>Delivered</option>
                </select>

                <div className='order-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input type='date'></input>

                <label>To</label>

                <input type='date'></input>
                <i className='fa-solid fa-rotate-right'></i>
            </div>
            <div className='order-header'>
                <span>Order</span>
                <span>Customer</span>
                <span>Order Date</span>
                <span>Total</span>
                <span>Status</span>
                <span>Details</span>
            </div>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
    )
}
