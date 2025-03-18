import React, { useState } from 'react'

import blank from '../assets/blank-image.png'

import '../styles/Admin.css'

import { useMangaContext } from '../hooks/useMangaContext'

export default function AddProduct() {
    const { dispatch } = useMangaContext()

    const [title, setTitle] = useState('')
    const [series, setSeries] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [supplier, setSupplier] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [cover1, setCover1] = useState('')
    const [cover2, setCover2] = useState('')
    const [error, setError] = useState(null)

    const handleUpload = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('series', series);
        formData.append('category', category);
        formData.append('author', author);
        formData.append('supplier', supplier);
        formData.append('stock', stock);
        formData.append('price', price);
        formData.append('description', description);
        
        if (cover1) 
            formData.append('cover1', cover1);

        if (cover2) 
            formData.append('cover2', cover2);

        // const manga = { title, series, category, author, supplier, 
        //                 stock, price, description, cover1, cover2 }

        const response = await fetch('http://localhost:4000/api/manga', {
            method: 'POST',
            body: formData
        })

        const json = await response.json()

        if (!response.ok)
            setError(json.error)

        if (response.ok) {
            setTitle('')
            setSeries('')
            setCategory('')
            setAuthor('')
            setSupplier('')
            setStock('')
            setPrice('')
            setDescription('')
            setCover1(null)
            setCover2(null)
            setError(null)

            dispatch({type: 'ADD_ITEM', payload: json})
            console.log('New manga added', json)
        }
    }

    return (
        <div className='add'>
            <h2>Add new Product</h2>

            <div className='add-info'>
                <label>Title</label><br/>
                <input type='text' placeholder='Enter title'
                        value={title} onChange={(e) => setTitle(e.target.value)}></input><br/>

                <label>Series</label><br/>
                <input type='text' placeholder='Enter series'
                        value={series} onChange={(e) => setSeries(e.target.value)}></input><br/>

                <label>Category</label><br/>
                <select className='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value='All'>--All--</option>
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

                <label>Author</label><br/>
                <input type='text' placeholder='Enter author'
                        value={author} onChange={(e) => setAuthor(e.target.value)}></input><br/>

                <label>Supplier</label><br/>
                <input type='text' placeholder='Enter supplier'
                        value={supplier} onChange={(e) => setSupplier(e.target.value)}></input><br/>

                <label>Stock</label><br/>
                <input type='text' placeholder='Enter stock'
                        value={stock} onChange={(e) => setStock(e.target.value)}></input><br/>

                <label>Price</label><br/>
                <input type='text' placeholder='Enter price'
                        value={price} onChange={(e) => setPrice(e.target.value)}></input><br/>

                <label>Description</label><br/>
                <textarea placeholder='Enter description'
                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br/>
            </div>
            <div className='add-imgs'>
                <div className='add-img'>
                    <img src={blank}></img>
                    <div className='add-file'>
                        <label className='add-label' htmlFor='img-input1'><i className='fa-solid fa-cloud-arrow-up'></i>Front Cover</label>
                        <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input1'
                                onChange={(e) => setCover1(e.target.files[0])}></input>
                    </div>
                </div>
                <div className='add-img'>
                    <img src={blank}></img>
                    <div className='add-file'>
                        <label className='add-label' htmlFor='img-input2'><i className='fa-solid fa-cloud-arrow-up'></i>Back Cover</label>
                        <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input2'
                            onChange={(e) => setCover2(e.target.files[0])}></input>
                    </div>
                </div>
            </div>

            <div className='add-btns'>
                <button onClick={(e) => handleUpload(e)}><i className='fa-solid fa-plus'></i>Add product</button>                  
            </div>
        </div>
    )
}
