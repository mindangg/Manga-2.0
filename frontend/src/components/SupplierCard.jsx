import React, { useEffect } from 'react'

import '../styles/Admin.css'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function SupplierCard({ supplier, handleEdit }) {
    const { dispatch } = useUserContext()
    const { admin } = useAdminContext()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/supplier/' + supplier._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
    
            if (!response.ok) {
                console.error('Failed to delete supplier')
                return
            }
            dispatch({type: 'DELETE_USER', payload: supplier._id})

        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='supplier-info'>
            <span>{supplier.name}</span>
            <span>{supplier.email}</span>
            <span>{supplier.phone}</span>
            <span>{supplier.address}</span>
            <span>{formatDate(supplier.createdAt)}</span>
            <span className='supplier-action'>
                <i className='fa-solid fa-pen-to-square' onClick={() => handleEdit(supplier)}></i>
                <i className='fa-solid fa-trash-can' onClick={handleDelete}></i>
            </span>
        </div>
    )
}
