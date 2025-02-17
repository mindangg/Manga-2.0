import React from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import blank from '../assets/blank-image.png'

import '../styles/Admin.css'

import ProductCard from '../components/ProductCard'

export default function Admin() {
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
                            <div><i class='fa-solid fa-chevron-left'></i></div>
                            <div>Home</div>
                        </li>
                        <li>
                            <div><i class='fa-regular fa-circle-user'></i></div>
                            <div>Admin</div>
                        </li>
                        <li>
                            <div><i class='fa-solid fa-arrow-right-from-bracket'></i></div>
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
                            <span class='search-btn'><i className='fa-solid fa-magnifying-glass'></i></span>
                            <input type='text' class='form-search-input' placeholder='Find...'></input>
                        </div>
                    </div>

                    <div className='admin-control-right'>
                        <button class='btn-control-large'><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                        <button class='btn-control-large'><i className='fa-solid fa-plus'></i>Add product</button>                  
                    </div>
                </div>
                <div className='add'>
                <h2>Add new Product</h2>

                <div className='add-info'>
                    <label>Title</label><br/>
                    <input type='text' placeholder='Enter title'></input><br/>

                    <label>Series</label><br/>
                    <input type='text' placeholder='Enter series'></input><br/>

                    <label>Category</label><br/>
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
                    </select><br/>

                    <label>Author</label><br/>
                    <input type='text' placeholder='Enter author'></input><br/>

                    <label>Supplier</label><br/>
                    <input type='text' placeholder='Enter supplier'></input><br/>

                    <label>Stock</label><br/>
                    <input type='text' placeholder='Enter stock'></input><br/>

                    <label>Price</label><br/>
                    <input type='text' placeholder='Enter price'></input><br/>

                    <label>Description</label><br/>
                    <textarea placeholder='Enter description'></textarea><br/>
                </div>
                <div className='add-imgs'>
                    <div className='add-img'>
                        <img src={blank}></img>
                        <div class='add-file'>
                            <label class='add-label' for='img-input1'><i className='fa-solid fa-cloud-arrow-up'></i>Front Cover</label>
                            <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input1'></input>
                        </div>
                    </div>
                    <div className='add-img'>
                        <img src={blank}></img>
                        <div class='add-file'>
                            <label class='add-label' for='img-input2'><i className='fa-solid fa-cloud-arrow-up'></i>Back Cover</label>
                            <input accept='image/jpeg, image/png, image/jpg' type='file' id='img-input2'></input>
                        </div>
                    </div>
                </div>

                <div className='add-btns'>
                    <button><i className='fa-solid fa-plus'></i>Add product</button>                  
                </div>
            </div>
            </div>


        </div>
    )
}
