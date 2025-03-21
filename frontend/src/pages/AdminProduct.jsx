import React, { useEffect, useState } from 'react'

import '../styles/Admin.css'

import ProductCard from '../components/ProductCard'
import AddProduct from '../components/AddProduct'
import Pagination from '../components/Pagination'

import { useMangaContext } from '../hooks/useMangaContext'

export default function AdminProduct() {
    const { manga, dispatch } = useMangaContext()

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const [isAdd, setIsAdd] = useState(false)

    const toggleAdd = () => {
        setIsAdd(!isAdd)
    }

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/manga')

                if (!response.ok)
                    console.error('Error fetching manga:', response.status)

                const json = await response.json()
    
                dispatch({type: 'DISPLAY_ITEM', payload: json})
            }
            catch (error) {
                console.error('Error fetching manga:', error)
            }
        }

        fetchManga()
    }, [dispatch])

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentManga = manga.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='manga-container'>
            <div className = 'manga-controller'>
                <select>
                    <option value='All'>All</option>
                    <option value='Shounen'>Shounen</option>
                    <option value='Rom Com'>Rom Com</option>
                    <option value='Family'>Family</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Slice Of Slice'>Slice Of Slice</option>
                    <option value='Action'>Action</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Drama'>Drama</option>
                    <option value='Dark Fantasy'>Dark Fantasy</option>
                </select>

                <div className='manga-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input type='date'></input>

                <label>To</label>

                <input type='date'></input>

                <div className='manga-icon'>
                    <button><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    <button onClick={toggleAdd}><i className='fa-solid fa-plus'></i>Add</button>
                </div>
            </div>
            <div className='manga-header'>
                <span>Cover</span>
                <span>Title</span>
                <span>Category</span>
                <span>Author</span>
                <span>Stock</span>
                <span>Price</span>
                <span>Edit</span>
            </div>
            
            {currentManga && currentManga.map((m) => (
                <ProductCard key={m._id} manga={m}/>
            ))}
            <Pagination
                totalProducts={manga.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            {isAdd && <AddProduct/>}
        </div>
    )
}
