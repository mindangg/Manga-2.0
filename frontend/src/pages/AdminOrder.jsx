import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import OrderCard from '../components/OrderCard'
import Pagination from '../components/Pagination'

import { useOrderContext } from '../hooks/useOrderContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminOrder() {
    // const { order, dispatch } = useOrderContext()
    const { admin } = useAdminContext()

    const [order, setOrder] = useState([])
    
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
            
            setOrder(json)

        }
        catch (error) {
            console.error('Error fetching order:', error)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [searchParams])

    const handleRefresh = () => {
        setFilter('')
        setStartDate('')
        setEndDate('')
        setSearchParams({})
    }
    
    useEffect(() => {
        handleRefresh()
    }, [])

    const [filter, setFilter] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    
    const handleFilter = (order, status, startDate, endDate) => {
        const newParams = new URLSearchParams(searchParams)

        if (order.trim() !== '') {
            newParams.set('order', order.trim())
        } 
        else
            newParams.delete('order')

        if (status !== '') {
            newParams.set('status', status)
        } 
        else
            newParams.delete('status')

        if (startDate !== '' || endDate !== '') {
            if (startDate !== '')
                newParams.set('startDate', startDate)

            if (endDate !== '') 
                newParams.set('endDate', endDate)
        }

        else {
            newParams.delete('startDate')
            newParams.delete('endDate')
        }

        setSearchParams(newParams)
    }
    
    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentOrder = order?.slice(firstPageIndex, lastPageIndex)
        
    const hasPermission = (admin, functionName, action) => {
        if (admin && admin.employee.role.permissions) {
            return admin.employee.role.permissions.some(permission => 
                permission.function === functionName &&
                permission.actions.includes(action)
            )
        }
    }

    return (
        <div className='order-container'>
            <div className = 'order-controller'>
                <select onChange={(e) => handleFilter('', e.target.value, '', '')}>
                    <option value=''>All</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Pending'>Pending</option>
                    <option value='Canceled'>Canceled</option>
                </select>

                <div className='order-search'>
                    <input
                    type='text'
                    placeholder='Search for...'
                    value={filter}
                    onChange={(e) => {
                        handleFilter(e.target.value, '', '', '');
                        setFilter(e.target.value)}}/>
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input 
                    type='date' 
                    value={startDate || ''}
                    onChange={(e) => {
                        handleFilter('', '', e.target.value, '');
                        setStartDate(e.target.value)}}/>

                <label>To</label>

                <input 
                    type='date' 
                    value={endDate || ''} 
                    onChange={(e) => {
                        handleFilter('', '', e.target.value, '');
                        setEndDate(e.target.value)}}/>

                <div className='order-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
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
                <OrderCard key={o._id} order={o} hasPermission={hasPermission} fetchOrder={fetchOrder}/>
            ))}
            <Pagination
                totalProducts={order?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
