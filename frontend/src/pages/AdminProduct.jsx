import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

import blank from '../assets/blank-image.png'

import { useMangaContext } from '../hooks/useMangaContext'
import { useAdminContext } from '../hooks/useAdminContext'
import { useUserContext } from '../hooks/useUserContext'

export default function AdminProduct() {
    const { manga, dispatch } = useMangaContext()
    const { users, dispatch: userDispatch } = useUserContext()
    const { admin } = useAdminContext()

    const [searchParams, setSearchParams] = useSearchParams()

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const [isToggle, setIsToggle] = useState(false)

    const [title, setTitle] = useState('')
    const [series, setSeries] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [supplier, setSupplier] = useState('')
    const [stock, setStock] = useState('')
    const [priceIn, setPriceIn] = useState('')
    const [description, setDescription] = useState('')
    const [cover1, setCover1] = useState('')
    const [cover2, setCover2] = useState('')

    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setTitle(product.title)
        setSeries(product.series)
        setCategory(product.category)
        setAuthor(product.author)
        setSupplier(product.supplier)
        // setStock(product.stock)
        setPriceIn(product.priceIn)
        setDescription(product.description)
        setIsToggle(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!selectedProduct) 
            return
        
        try {
            const response = await fetch(`http://localhost:4000/api/manga/${selectedProduct._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ title, series, category, author, supplier, priceIn, description })
            })
        
            if (!response.ok)
                throw new Error('Failed to update product')
        
            const json = await response.json()
            dispatch({ type: 'UPDATE_ITEM', payload: json })
        
            setIsToggle(false)
            setTitle('')
            setSeries('')
            setCategory('')
            setAuthor('')
            setSupplier('')
            setStock('')
            setPriceIn('')
            setDescription('')
            setSelectedProduct(null)
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        console.log(supplier)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('series', series)
        formData.append('category', category)
        formData.append('author', author)
        formData.append('supplierID', supplier)
        // formData.append('stock', stock)
        formData.append('priceIn', priceIn)
        formData.append('description', description)
    
        if (cover1) 
            formData.append('cover1', cover1)
        
        if (cover2) 
            formData.append('cover2', cover2)
    
        try {
            const response = await fetch('http://localhost:4000/api/manga', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                },
                body: formData
            })
    
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    
            const json = await response.json()
    
            setTitle('')
            setSeries('')
            setCategory('')
            setAuthor('')
            setSupplier('')
            setStock('')
            setPriceIn('')
            setDescription('')
            setCover1(null)
            setCover2(null)
    
            dispatch({ type: 'ADD_ITEM', payload: json })
            console.log('New manga added', json)

            setIsToggle(!isToggle)

        } 
        catch (error) {
            console.error('Error uploading manga:', error)
        }
    }
    
    const fetchManga = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/manga?${searchParams}`
            : `http://localhost:4000/api/manga`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching manga:', response.status)

            const json = await response.json()

            dispatch({type: 'DISPLAY_ITEM', payload: json})

            return json
        }
        catch (error) {
            console.error('Error fetching manga:', error)
        }
    }

    const fetchSupplier = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/supplier', {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching supplier:', response.status)

            const json = await response.json()

            userDispatch({type: 'SET_USER', payload: json})

            return json
        }
        catch (error) {
            console.error('Error fetching manga:', error)
        }
    }

    useEffect(() => {
        fetchManga()
        fetchSupplier()
    }, [dispatch, userDispatch, searchParams])

    const toggle = () => {
        if (selectedProduct) {
            setTitle('')
            setSeries('')
            setCategory('')
            setAuthor('')
            setSupplier('')
            // setStock('')
            setPriceIn('')
            setDescription('')
            setCover1('')
            setCover2('')
        }
        setSelectedProduct(null)

        setIsToggle(!isToggle)
    }

    const handleRefresh = () => {
        setFilter('')
        setSearchParams({})
    }
        
    useEffect(() => {
        handleRefresh()
    }, [])

    const [filter, setFilter] = useState('')
    
    const handleFilter = (title, category, supplier) => {
        const newParams = new URLSearchParams(searchParams)

        if (title.trim() !== '') {
            newParams.set('title', title.trim())
        } 
        else
            newParams.delete('title')

        if (category !== '') {
            newParams.set('category', category)
        } 
        else
            newParams.delete('category')

        if (supplier !== '') {
            newParams.set('supplier', supplier)
        } 
        else
            newParams.delete('supplier')

        setSearchParams(newParams)
    }

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentManga = manga?.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='manga-container'>
            <div className = 'manga-controller'>
                <select onChange={(e) => handleFilter('', e.target.value, '')}>
                    <option value=''>All</option>
                    <option value='Shounen'>Shounen</option>
                    <option value='Rom Com'>Rom Com</option>
                    <option value='Family'>Family</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Action'>Action</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Seinen'>Seinen</option>
                    <option value='Dark Fantasy'>Dark Fantasy</option>
                </select>

                <select onChange={(e) => handleFilter('', '', e.target.value)}>
                    <option value=''>All</option>
                    {users.map((u) => (
                        <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                </select>

                <div className='manga-search'>
                    <input
                    type='text'
                    placeholder='Search for...'
                    value={filter}
                    onChange={(e) => {
                        handleFilter(e.target.value, '', '');
                        setFilter(e.target.value)}}/>
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>

                <div className='manga-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    <button onClick={toggle}><i className='fa-solid fa-plus'></i>Add</button>
                </div>
            </div>
            <div className='manga-header'>
                <span>Cover</span>
                <span>Title</span>
                <span>Category</span>
                <span>Author</span>
                <span>Stock</span>
                <span>PriceIn</span>
                <span>Edit</span>
            </div>
            
            {currentManga && currentManga.map((m) => (
                <ProductCard key={m._id} manga={m} handleEdit={handleEdit}/>
            ))}
            <Pagination
                totalProducts={manga?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            {isToggle && (
                <div className='add-user-container'>
                    <div className='add-manga'>
                        <i className='fa-solid fa-xmark' onClick={toggle}></i>
                        {selectedProduct ? (
                            <h2>Edit product</h2>
                        ) : (
                            <h2>Add new product</h2>
                        )}
                        <form onSubmit={selectedProduct ? handleSave : handleUpload}>
                            <input type='text' placeholder='Title' value={title} 
                                        onChange={(e) => setTitle(e.target.value)}/>

                            <input type='text' placeholder='Series' value={series}
                                        onChange={(e) => setSeries(e.target.value)}/>

                            <select value={category} 
                                        onChange={(e) => setCategory(e.target.value)}>
                                <option value=''>Category</option>
                                <option value='Shounen'>Shounen</option>
                                <option value='Rom Com'>Rom Com</option>
                                <option value='Family'>Family</option>
                                <option value='Fantasy'>Fantasy</option>
                                <option value='Slice Of Life'>Slice Of Life</option>
                                <option value='Action'>Action</option>
                                <option value='Comedy'>Comedy</option>
                                <option value='Drama'>Drama</option>
                                <option value='Dark Fantasy'>Dark Fantasy</option>
                            </select><br/>
        
                            <input type='text' placeholder='Author' value={author}
                                        onChange={(e) => setAuthor(e.target.value)}/>

                            <select value={supplier} 
                                        onChange={(e) => setSupplier(e.target.value)}>
                                <option value=''>Supplier</option>
                                {users.map((u) => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select><br/>

                            <input type='text' placeholder='PriceIn' value={priceIn}
                                        onChange={(e) => setPriceIn(e.target.value)}/>

                            <input type='text' placeholder='Description' value={description}
                                        onChange={(e) => setDescription(e.target.value)}/>

                            <div className='add-manga-imgs'>
                                <div className='add-manga-img'>
                                    <img src={blank}></img>
                                    <div className='add-manga-file'>
                                        <label htmlFor='img-input1'><i className='fa-solid fa-cloud-arrow-up'></i>Front Cover</label>
                                        <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input1'
                                                onChange={(e) => setCover1(e.target.files[0])}></input>
                                    </div>
                                </div>
                                <div className='add-manga-img'>
                                    <img src={blank}></img>
                                    <div className='add-manga-file'>
                                        <label htmlFor='img-input2'><i className='fa-solid fa-cloud-arrow-up'></i>Back Cover</label>
                                        <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input2'
                                            onChange={(e) => setCover2(e.target.files[0])}></input>
                                    </div>
                                </div>
                            </div>
        
                            <div style={{ textAlign: 'center' }}>
                                {selectedProduct ? (
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