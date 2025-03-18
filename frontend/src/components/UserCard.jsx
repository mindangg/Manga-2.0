import React from 'react'

import '../styles/Admin.css'

export default function UserCard({ user }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
    }

    return (
        <div className='user-info'>
            <span>{user.fullname}</span>
            <span>{user.username}</span>
            <span>{user.email}</span>
            <span>{user.phone}</span>
            <span>{user.address}</span>
            <span>{formatDate(user.createdAt)}</span>
            <span className='user-status'>{user.status}</span>
            <span className='user-action'>
                <i className='fa-solid fa-pen-to-square'></i>
                <i className='fa-solid fa-trash-can'></i>
            </span>
        </div>
    )
}
