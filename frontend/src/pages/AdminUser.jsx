import React, { useEffect, useState } from 'react'

import '../styles/Admin.css'

import UserCard from '../components/UserCard'

import AddUser from '../components/AddUser'
import Pagination from '../components/Pagination'

export default function AdminUser() {
    const [isAdd, setIsAdd] = useState(false)
    const [user, setUser] = useState([])

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const toggleAdd = () => {
        setIsAdd(!isAdd)
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/user')

                if (!response.ok)
                    console.error('Error fetching user:', response.status)
                
                const json = await response.json()
                // console.log(json)
                setUser(json)
            }
            catch (error) {
                console.error('Error fetching user:', error)
            }
        }

        fetchUser()
    }, [])

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentUser = user.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='user-container'>
            <div className = 'user-controller'>
                <select id='option'>
                    <option value='all'>All</option>
                    <option value='active'>Active</option>
                    <option value='disable'>Disable</option>
                </select>

                <div className='user-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input type='date'></input>

                <label>To</label>

                <input type='date'></input>
                <i className='fa-solid fa-rotate-right'></i>
                <button onClick={toggleAdd}>
                    <i class="fa-solid fa-plus" style={{color: 'black', marginRight: '2px'}}></i>
                    Add User
                </button>
            </div>
            <div className='user-header'>
                <span>Full Name</span>
                <span>Username</span>
                <span>Email</span>
                <span>Phone Number</span>
                <span>Address</span>
                <span>Date Created</span>
                <span>Status</span>
                <span>Edit</span>
            </div>

            {currentUser && currentUser.map((u) => (
                <UserCard key={u._id} user={u} />
            ))}
            <Pagination
                totalProducts={user.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            {isAdd && <AddUser toggleAdd={toggleAdd}/>}
        </div>
    )
}
