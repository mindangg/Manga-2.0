import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import UserCard from '../components/UserCard'
import Pagination from '../components/Pagination'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminUser() {
    const { users, dispatch } = useUserContext()
    const { admin } = useAdminContext()
    
    const [searchParams, setSearchParams] = useSearchParams()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [status, setStatus] = useState('')

    const [isToggle, setIsToggle] = useState(false)

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const fetchUser = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/user?${searchParams}`
            : `http://localhost:4000/api/user`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching user:', response.status)
            
            const json = await response.json()
            console.log(json)
            dispatch({type: 'CLEAR_USER'})
            dispatch({type: 'SET_USER', payload: json})
        }
        catch (error) {
            console.error('Error fetching user:', error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [dispatch, searchParams])

    const toggle = () => {
        setIsToggle(!isToggle)
        if (selectedUser) {
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
            setAddress('')
            setStatus('')
        }

        setSelectedUser(null)
    }

    const [selectedUser, setSelectedUser] = useState(null)

    const handleEdit = (user) => {
        setSelectedUser(user)
        setUsername(user.username)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
        setStatus(user.status)
        setIsToggle(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!selectedUser) 
            return
    
        try {
            const response = await fetch(`http://localhost:4000/api/user/${selectedUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ username, email, phone, address, status })
            })

            if (!response.ok)
                throw new Error('Failed to update user')
    
            const json = await response.json()
            dispatch({ type: 'UPDATE_USER', payload: json })

            setIsToggle(false)
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
            setAddress('')
            setStatus('')
            setSelectedUser(null)
        } 
        catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ username, email, password, phone, address })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            const json = await response.json()

            dispatch({type: 'ADD_USER', payload: json.user})
            setIsToggle(false)
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
            setAddress('')
            setStatus('')
            setSelectedUser(null)
        }
        catch (error) {
            console.error(error)
        }
    }
    
    const handleRefresh = () => {
        setSearchParams({})
    }
        
    useEffect(() => {
        handleRefresh()
    }, [])

    const [filter, setFilter] = useState('')
    
    const handleFilter = (username, status) => {
        const newParams = new URLSearchParams(searchParams)

        if (username.trim() !== '') {
            newParams.set('username', username.trim())
        } 
        else
            newParams.delete('username')

        if (status !== '') {
            newParams.set('status', status)
        } 
        else
            newParams.delete('status')

        setSearchParams(newParams)
    }
      
    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentUser = users?.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='user-container'>
            <div className = 'user-controller'>
                <select onChange={(e) => handleFilter('', e.target.value)}>
                    <option value=''>All</option>
                    <option value='Active'>Active</option>
                    <option value='Disabled'>Disabled</option>
                </select>

                <div className='user-search'>
                    <input
                    type='text'
                    placeholder='Search for...'
                    value={filter}
                    onChange={(e) => {
                        handleFilter(e.target.value, '');
                        setFilter(e.target.value)}}/>
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>

                <div className='user-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    <button onClick={toggle}><i className='fa-solid fa-plus'></i>Add</button>
                </div>
            </div>
            <div className='user-header'>
                <span>Username</span>
                <span>Email</span>
                <span>Phone Number</span>
                <span>Address</span>
                <span>Date Created</span>
                <span>Status</span>
                <span>Edit</span>
            </div>

            {currentUser && currentUser.map((u) => (
                <UserCard key={u._id} user={u} handleEdit={handleEdit}/>
            ))}
            <Pagination
                totalProducts={users?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            {isToggle && (
                <div className='add-user-container'>
                    <div className='add-user'>
                        <i className='fa-solid fa-xmark' onClick={toggle}></i>
                        {selectedUser ? (
                            <h2>Edit customer</h2>
                        ) : (
                            <h2>Add new customer</h2>
                        )}
                        <form onSubmit={selectedUser ? handleSave : handleUpload}>
                            <label>User name</label>
                            <input type='text' placeholder='User name' value={username} 
                                        onChange={(e) => setUsername(e.target.value)}/>
        
                            <label>Email</label>
                            <input type='text' placeholder='Email' value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
        
                            {!selectedUser && (
                                <>
                                    <label>Password</label>
                                    <input type='text' placeholder='Password' value={password}
                                                onChange={(e) => setPassword(e.target.value)}/>
                                </>
                            )}

                            <label>Phone number</label>
                            <input type='text' placeholder='Phone numer' value={phone}
                                        onChange={(e) => setPhone(e.target.value)}/>
        
                            <label>Address</label>
                            <input type='address' placeholder='Address' value={address}
                                        onChange={(e) => setAddress(e.target.value)}/>

                            {selectedUser && (
                                <>
                                    <label>Status</label><br/>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value='Active'>Active</option>
                                        <option value='Disabled'>Disabled</option>
                                    </select>
                                </>
                            )}
        
                            <div style={{ textAlign: 'center' }}>
                                {selectedUser ? (
                                    <button type='submit'>Save</button>
                                ) : (
                                    <button type='submit'>+ Add</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
