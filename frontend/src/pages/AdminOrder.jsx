import React, { useState, useEffect } from 'react'

import '../styles/Admin.css'

import OrderCard from '../components/OrderCard'
import Pagination from '../components/Pagination'

export default function AdminOrder() {
    const [order, setOrder] = useState([])

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/order')

                if (!response.ok)
                    console.error('Error fetching order:', response.status)

                const json = await response.json()
                // console.log(json)
                setOrder(json)
            }
            catch (error) {
                console.error('Error fetching order:', error)
            }
        }

        fetchOrder()
    }, [])

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentOrder = order.slice(firstPageIndex, lastPageIndex)

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

            {currentOrder && currentOrder.map((o) => (
                <OrderCard key={o._id} order={o}/>
            ))}
            <Pagination
                totalProducts={order.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
