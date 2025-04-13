import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import SupplierCard from '../components/SupplierCard'
import StockCard from '../components/StockCard'
import StockInForm from '../components/StockInForm'
import Pagination from '../components/Pagination'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'
import { useOrderContext } from '../hooks/useOrderContext'

export default function AdminSupplier() {
    const { users, dispatch } = useUserContext()
    const { admin } = useAdminContext()
    const { order, dispatch: orderDispatch } = useOrderContext()
    
    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [status, setStatus] = useState('')

    const [action, setAction] = useState('Supplier')
    const [isToggle, setIsToggle] = useState(false)

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const fetchSupplier = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/supplier?${searchParams}`
            : `http://localhost:4000/api/supplier`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching supplier:', response.status)
            
            const json = await response.json()

            dispatch({type: 'SET_USER', payload: json})

            return json
        }
        catch (error) {
            console.error('Error fetching supplier:', error)
        }
    }

    const fetchStock = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/stock?${searchParams}`
            : `http://localhost:4000/api/stock`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching stock:', response.status)
            
            const json = await response.json()

            orderDispatch({ type: 'DISPLAY_ITEM', payload: json})
            console.log(order)
        }
        catch (error) {
            console.error('Error fetching stockp:', error)
        }
    }

    const fetchManga = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/manga', {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching manga:', response.status)

            const json = await response.json()

            setProducts(json)
        }
        catch (error) {
            console.error('Error fetching manga:', error)
        }
    }

    useEffect(() => {
        fetchSupplier()
        fetchManga()
        fetchStock()
    }, [dispatch, searchParams])

    const toggle = () => {
        setIsToggle(!isToggle)
        if (selectedSupplier) {
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setStatus('')
        }

        setSelectedSupplier(null)
    }

    const [selectedSupplier, setSelectedSupplier] = useState(null)

    const handleEdit = (supplier) => {
        setSelectedSupplier(supplier)
        setName(supplier.name)
        setEmail(supplier.email)
        setPhone(supplier.phone)
        setAddress(supplier.address)
        setIsToggle(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!selectedSupplier) 
            return
    
        try {
            console.log(selectedSupplier._id)
            const response = await fetch(`http://localhost:4000/api/supplier/${selectedSupplier._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ name, email, phone, address })
            })

            if (!response.ok)
                throw new Error('Failed to update supplier')
    
            const json = await response.json()
            dispatch({ type: 'UPDATE_USER', payload: json })

            setIsToggle(false)
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setSelectedSupplier(null)
        } 
        catch (error) {
            console.error('Error updating supplier:', error)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/api/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ name, email, phone, address })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            const json = await response.json()

            dispatch({type: 'ADD_USER', payload: json})

            setIsToggle(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    let currentSupplier = []
    let currentStock = []
    
    if (action === 'Supplier') {
        const lastPageIndex = currentPage * productPerPages
        const firstPageIndex = lastPageIndex - productPerPages
        currentSupplier = users?.slice(firstPageIndex, lastPageIndex)
    }

    else {
        const lastPageIndex = currentPage * productPerPages
        const firstPageIndex = lastPageIndex - productPerPages
        currentStock = order?.slice(firstPageIndex, lastPageIndex)
    }

    const handleRefresh = () => {
        setSearchParams({})
    }
  
    useEffect(() => {
        setFilterSupplier('')
        setFilterStock('')
        handleRefresh()
    }, [action])

    const [filterSupplier, setFilterSupplier] = useState('')
    const [filterStock, setFilterStock] = useState('')
    
    const handleFilterSupplier = (name) => {
        const newParams = new URLSearchParams(searchParams)

        if (name.trim() !== '') {
            newParams.set('name', name.trim())
        } 
        else
            newParams.delete('name')

        setSearchParams(newParams)
    }

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    
    const handleFilterStock = (startDate, endDate) => {
        const newParams = new URLSearchParams(searchParams)

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

    return (
        <div className='supplier-container'>
            <div className = 'supplier-controller'>
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value='Supplier'>Supplier</option>
                    <option value='Stock Receipt'>Stock Receipt</option>
                </select>

                <div className='supplier-search'>
                    <input type='text' 
                    placeholder='Search for...'
                    value={filterSupplier}
                    onChange={(e) => {
                        handleFilterSupplier(e.target.value);
                        setFilterSupplier(e.target.value)}}/> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>

                {
                    action !== 'Supplier' && (
                        <>
                            <label>From</label>

                            <input 
                                type='date' 
                                value={startDate || ''}
                                onChange={(e) => handleFilterStock(e.target.value, '')} 
                            />
            
                            <label>To</label>
            
                            <input 
                                type='date' 
                                value={endDate || ''} 
                                onChange={(e) => handleFilterStock('', e.target.value)} 
                            />
                        </>
                    )
                }  
                
                <div className='supplier-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    {
                        action === 'Supplier' 
                        ? (
                            <button onClick={toggle}><i className='fa-solid fa-plus'></i>Add</button>
                        )
                        : (
                            <button onClick={toggle}><i className='fa-solid fa-plus'></i>Stock in</button>
                        )
                    }        
                </div>
            </div>
            {action === 'Supplier' ? (
                <>
                    <div className='supplier-header'>
                        <span>Name</span>
                        <span>Email</span>
                        <span>Phone Number</span>
                        <span>Address</span>
                        <span>Date Created</span>
                        <span>Edit</span>
                    </div>
                    {currentSupplier?.map((s) => (
                        <SupplierCard key={s._id} supplier={s} handleEdit={handleEdit} />
                    ))}
                    <Pagination
                        totalProducts={users?.length} 
                        productPerPages={productPerPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                </>
            ) : (
                <>
                    <div className='stock-header'>
                        <span>Stock</span>
                        <span>Employee</span>
                        <span>Date Created</span>
                        <span>Quantity</span>
                        <span>Total</span>
                        <span>Details</span>
                    </div>
                    {currentStock?.map((s) => (
                        <StockCard key={s._id} stock={s}/>
                    ))}
                    <Pagination
                        totalProducts={order?.length} 
                        productPerPages={productPerPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                </>
            )}

            {isToggle && action === 'Supplier' && (
                <div className='add-supplier-container'>
                    <div className='add-supplier'>
                        <i className='fa-solid fa-xmark' onClick={toggle}></i>
                        {selectedSupplier ? (
                            <h2>Edit supplier</h2>
                        ) : (
                            <h2>Add new supplier</h2>
                        )}
                        <form onSubmit={selectedSupplier ? handleSave : handleUpload}>
                            <label>Name</label>
                            <input type='text' placeholder='Name' value={name} 
                                        onChange={(e) => setName(e.target.value)}/>
        
                            <label>Email</label>
                            <input type='text' placeholder='Email' value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>

                            <label>Phone number</label>
                            <input type='text' placeholder='Phone numer' value={phone}
                                        onChange={(e) => setPhone(e.target.value)}/>
        
                            <label>Address</label>
                            <input type='address' placeholder='Address' value={address}
                                        onChange={(e) => setAddress(e.target.value)}/>
        
                            <div style={{ textAlign: 'center' }}>
                                {selectedSupplier ? (
                                    <button type='submit'>Save</button>
                                ) : (
                                    <button type='submit'>+ Add</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isToggle && action === 'Stock Receipt' && (
                <StockInForm products={products} toggle={toggle}/>
            )}
        </div>
    )
}
