import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import OrderCard from '../components/OrderCard'
import Pagination from '../components/Pagination'

import { useOrderContext } from '../hooks/useOrderContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminOrder() {
    const { order, dispatch } = useOrderContext()
    const { admin } = useAdminContext()
    
    const [searchParams, setSearchParams] = useSearchParams()

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const fetchOrder = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/order?${searchParams}`
            : `http://localhost:4000/api/order`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching order:', response.status)
            
            const json = await response.json()
            
            dispatch({type: 'DISPLAY_ITEM', payload: json})

            return json
        }
        catch (error) {
            console.error('Error fetching order:', error)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [dispatch, searchParams])

    // const [status, setStatus] = useState('All')
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')

    // const handleFilterChange = (newStatus, newStartDate, newEndDate) => {
    //     setStatus(newStatus ?? status)
    //     setStartDate(newStartDate ?? startDate)
    //     setEndDate(newEndDate ?? endDate)
    //     filterOrder(newStatus ?? status, newStartDate ?? startDate, newEndDate ?? endDate)
    // }    

    // const filterOrder = async (status, startDate, endDate) => {
    //     try {
    //         const orders = await fetchOrder()
    //         let filteredOrders = orders

    //         if (status !== 'All') {
    //             filteredOrders = filteredOrders.filter((o) => o.status === status)
    //         }

    //         if (startDate && endDate) {
    //             const start = new Date(startDate)
    //             const end = new Date(endDate)

    //             if (start > end) {
    //                 alert('Wrong date format')
    //                 return
    //             }

    //             filteredOrders = filteredOrders.filter((o) => {
    //                 const orderDate = new Date(o.createdAt)
    //                 return orderDate >= start && orderDate <= end
    //             })
    //         }
    
    //         dispatch({ type: 'DISPLAY_ITEM', payload: filteredOrders })
    //     } 
    //     catch (error) {
    //         console.error('Error filtering orders:', error)
    //     }
    // }

    // const handleRefresh = () => {
    //     setStatus('All')
    //     setStartDate('')
    //     setEndDate('')
    //     fetchOrder()
    // }

    
    const handleRefresh = () => {
        setSearchParams({})
    }

    const [filter, setFilter] = useState('')
    
    const handleFilter = (title, category, supplier) => {
        const newParams = new URLSearchParams(searchParams)

        if (title.trim() !== '') {
            newParams.set('title', title.trim())
        } 
        else
            newParams.delete('title')

        if (category !== '') {
            newParams.set('category', category)
        } 
        else
            newParams.delete('category')

        if (supplier !== '') {
            newParams.set('supplier', supplier)
        } 
        else
            newParams.delete('supplier')

        setSearchParams(newParams)
    }
    
    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentOrder = order?.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='order-container'>
            <div className = 'order-controller'>
                <select value={status} onChange={(e) => handleFilterChange(e.target.value, startDate, endDate)}>
                    <option value='All'>All</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Pending'>Pending</option>
                    <option value='Canceled'>Canceled</option>
                </select>

                <div className='order-search'>
                    <input
                    type='text'
                    placeholder='Search for...'
                //     value={filter}
                //     onChange={(e) => {
                //         handleFilter('', e.target.value);
                //         setFilter(e.target.value);
                //     }
                // }
                    />
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input 
                    type='date' 
                    value={startDate || ''}
                    onChange={(e) => handleFilterChange(status, e.target.value, endDate)} 
                />

                <label>To</label>

                <input 
                    type='date' 
                    value={endDate || ''} 
                    onChange={(e) => handleFilterChange(status, startDate, e.target.value)} 
                />

                <div className='order-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    {/* <button onClick={toggleAdd}><i className='fa-solid fa-plus'></i>Add</button> */}
                </div>
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
                totalProducts={order?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
