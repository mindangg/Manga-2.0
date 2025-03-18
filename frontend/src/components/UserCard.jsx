import React from 'react'

import '../styles/Admin.css'

import { useUserContext } from '../hooks/useUserContext'

export default function UserCard({ user }) {
    const { dispatch } = useUserContext()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user/' + user._id, {
                method: 'DELETE'
    
            })
    
            if (!response.ok) {
                console.error('Failed to delete user')
                return
            }
            dispatch({type: 'DELETE_ITEM', payload: user._id})
        }
        catch (error) {
            console.error(error)
        }
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
                <i className='fa-solid fa-trash-can' onClick={handleDelete}></i>
            </span>
        </div>
    )
}
