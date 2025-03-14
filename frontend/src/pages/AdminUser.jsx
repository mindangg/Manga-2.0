import React from 'react'

import '../styles/Admin.css'

import UserCard from '../components/UserCard'

import AddUser from '../components/AddUser'

export default function AdminUser() {
    return (
        <div className='user-container'>
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

            <UserCard/>
            <UserCard/>
            <UserCard/>
        </div>
    )
}
