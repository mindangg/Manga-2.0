import React, { useState }  from 'react'

import '../styles/Admin.css'

import { useMangaContext } from '../hooks/useMangaContext'
import { useAdminContext } from '../hooks/useAdminContext'

import Confirm from './Confirm'

export default function ProductCard({ manga, handleEdit, hasPermission }) {
    const { dispatch } = useMangaContext()
    const { admin } = useAdminContext()
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/manga/' + manga._id, {
                method: 'DELETE',
            })

            if (!response.ok) {
                console.error('Failed to delete manga')
                return
            }

            dispatch({type: 'DELETE_ITEM', payload: manga._id})
        }
        catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className='manga-info'>
            <span>
                <img src={`http://localhost:4000/${manga.cover1}`}></img>
            </span>
            <span>{manga.title}</span>
            <span>{manga.category}</span>
            <span>{manga.author}</span>
            <span>{manga.stock}</span>
            <span>$ {manga.priceIn}</span>
            <span className='manga-action'>
            {hasPermission(admin, 'Product', 'Update') && (
                <i className='fa-solid fa-pen-to-square' onClick={() => handleEdit(manga)}></i>
            )}
            {hasPermission(admin, 'Product', 'Delete') && (
                <i className='fa-solid fa-trash-can' onClick={() => setShowConfirm(true)}></i>
            )}
            </span>
            {showConfirm && (
                <Confirm
                    message='Are you sure you want to delete this manga?'
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
