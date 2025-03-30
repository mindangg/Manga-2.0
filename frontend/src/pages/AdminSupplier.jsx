import React, { useEffect, useState } from 'react'

import '../styles/Admin.css'

import SupplierCard from '../components/SupplierCard'
import StockCard from '../components/StockCard'
import StockInForm from '../components/StockInForm'
import Pagination from '../components/Pagination'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminSupplier() {
    const { users, dispatch } = useUserContext()
    const { admin } = useAdminContext()

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
            const response = await fetch('http://localhost:4000/api/supplier', {
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
    }, [dispatch])
    
    const filterSupplier = async (status) => {
        try {
            const supplier = await fetchSupplier()
            let filteredSupplier = supplier
    
            if (status !== 'All')
                filteredSupplier = supplier.filter((s) => s.status === status)
            
            dispatch({ type: 'SET_USER', payload: filteredSupplier })
        } 
        catch (error) {
            console.error('Error filtering supplier:', error)
        }
    }

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
                body: JSON.stringify({ employeeID: admin.employee._id, name, email, phone, address })
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
        currentStock = users?.slice(firstPageIndex, lastPageIndex)
    }

    return (
        <div className='supplier-container'>
            <div className = 'supplier-controller'>
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value='Supplier'>Supplier</option>
                    <option value='Stock Receipt'>Stock Receipt</option>
                </select>

                <div className='supplier-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input type='date'></input>

                <label>To</label>

                <input type='date'></input>

                <div className='supplier-icon'>
                    <button><i className='fa-solid fa-rotate-right'></i>Refresh</button>
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
            <div className='supplier-header'>
                <span>Name</span>
                <span>Email</span>
                <span>Phone Number</span>
                <span>Address</span>
                <span>Date Created</span>
                <span>Edit</span>
            </div>
            {
                action === 'Supplier' 
                ? (
                    currentSupplier && currentSupplier.map((s) => (
                        <SupplierCard key={s._id} supplier={s} handleEdit={handleEdit}/>
                    ))
                )
                : (
                    currentStock && currentStock.map((s) => (
                        <StockCard key={s._id} stock={s} handleEdit={handleEdit}/>
                    ))
                )
            }

            <Pagination
                totalProducts={users?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

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

                            {selectedSupplier && (
                                <>
                                    <label>Status</label><br/>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value='Active'>Active</option>
                                        <option value='Disabled'>Disabled</option>
                                    </select>
                                </>
                            )}
        
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
