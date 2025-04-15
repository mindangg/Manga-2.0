import React, { useState } from 'react'

import '../styles/Admin.css'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

import Confirm from './Confirm'

export default function UserCard({ user, handleEdit }) {
    const { dispatch } = useUserContext()
    const { admin } = useAdminContext()
    const [showConfirm, setShowConfirm] = useState(false)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user/' + user._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
    
            if (!response.ok) {
                console.error('Failed to delete user')
                return
            }
            dispatch({type: 'DELETE_USER', payload: user._id})

            // remove user from local storage
            localStorage.removeItem('user')
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='user-info'>
            <span>{user.username}</span>
            <span>{user.email}</span>
            <span>{user.phone}</span>
            <span>{user.address}</span>
            <span>{formatDate(user.createdAt)}</span>
            <span className={`user-status-${user.status}`}>{user.status}</span>
            <span className='user-action'>
                <i className='fa-solid fa-pen-to-square' onClick={() => handleEdit(user)}></i>
                <i className='fa-solid fa-trash-can' onClick={() => setShowConfirm(true)}></i>
            </span>
            {showConfirm && (
                <Confirm
                    message='Are you sure you want to delete this user?'
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
