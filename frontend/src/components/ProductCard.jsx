import React from 'react'

import '../styles/Admin.css'

import { useMangaContext } from '../hooks/useMangaContext'

export default function ProductCard({ manga }) {
    const { dispatch } = useMangaContext()

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
            <span>$ {manga.price}</span>
            <span className='manga-action'>
                <i className='fa-solid fa-pen-to-square'></i>
                <i className='fa-solid fa-trash-can' onClick={handleDelete}></i>
            </span>
        </div>
    )
}
