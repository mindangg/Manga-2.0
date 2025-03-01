import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import blank from '../assets/blank-image.png'

import '../styles/Admin.css'

import ProductCard from '../components/ProductCard'

export default function Admin() {
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
            // headers: {
            //     'Content-Type': 'application/json'
            // }
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

            console.log('New manga added', json)
        }
    }

    return (
        <div>
            <div className='sidenav'>
                <div className='ok'>
                    <div className='topnav'>
                        <img src={logo}></img>
                    </div>
                    <div className='middlenav'>
                        <ul>
                            <li>
                                <div><i className='fa-solid fa-book'></i></div>
                                <div>Product</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-users'></i></div>
                                <div>User</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-basket-shopping'></i></div>
                                <div>Order</div>
                            </li>
                            <li>
                                <div><i className='fa-solid fa-chart-simple'></i></div>
                                <div>Statistic</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='bottomnav'>
                    <ul>
                        <li>
                            <div><i className='fa-solid fa-chevron-left'></i></div>
                            <div>Home</div>
                        </li>
                        <li>
                            <div><i className='fa-regular fa-circle-user'></i></div>
                            <div>Admin</div>
                        </li>
                        <li>
                            <div><i className='fa-solid fa-arrow-right-from-bracket'></i></div>
                            <div>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='content'>
                <div className='controllers'>
                    <div className='admin-control-left'>
                        <select className='category'>
                            <option value=''>--Choose a tag--</option>
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

                        <select className='supplier'>
                            <option value=''>--Choose a tag--</option>
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
                    </div>

                    <div className='admin-control-center'>
                        <div className='form-search'>
                            <span className='search-btn'><i className='fa-solid fa-magnifying-glass'></i></span>
                            <input type='text' className='form-search-input' placeholder='Find...'></input>
                        </div>
                    </div>

                    <div className='admin-control-right'>
                        <button className='btn-control-large'><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                        <button className='btn-control-large'><i className='fa-solid fa-plus'></i>Add product</button>                  
                    </div>
                </div>
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
            </div>


        </div>
    )
}
