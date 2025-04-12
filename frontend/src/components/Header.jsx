import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Header.css'
import Search from './Search'

import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useFilter } from '../hooks/useFilter'

export default function Header() {
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()
    const navigate = useNavigate()

    const { handleFilter } = useFilter()

    const search = () => {
        document.querySelector(".search-popup").style.display = "flex";
        document.querySelector(".search").style.animationName = "rightToLeft"
    }

    const handleClick = () => {
        if (!user)
            showNotification('Please login to view cart') 
        else
            navigate('/cart')
    }

    const [toggle, setToggle] = useState('home')

    return (
        <header>
            <div className='logo'>
                <Link to='/'><img src={logo}></img></Link>
            </div>

            <nav className='navbar'>
                <Link className={toggle === 'home' ? 'active' : ''} onClick={() => (setToggle('home'))} to='/'>Home</Link>
                <Link className={toggle === 'product' ? 'active' : ''} onClick={() => (setToggle('product'))} to='/product'>Product</Link>
                <div className='category'>
                    <Link className={toggle === 'category' ? 'active' : ''} onClick={() => (setToggle('category'))}>Category</Link>
                    <div className="category-dropdown">
                        <span onClick={() => { handleFilter('', 'shounen', '', ''); setToggle('category') }}>Shounen</span>
                        <span onClick={() => { handleFilter('', 'seinen', '', ''); setToggle('category') }}>Seinen</span>
                        <span onClick={() => { handleFilter('', 'rom-com', '', ''); setToggle('category') }}>Rom Com</span>
                        <span onClick={() => { handleFilter('', 'action', '', ''); setToggle('category') }}>Action</span>
                        <span onClick={() => { handleFilter('', 'family', '', ''); setToggle('category') }}>Family</span>
                        <span onClick={() => { handleFilter('', 'comedy', '', ''); setToggle('category') }}>Comedy</span>
                        <span onClick={() => { handleFilter('', 'fantasy', '', ''); setToggle('category') }}>Fantasy</span>
                        <span onClick={() => { handleFilter('', 'dark-fantasy', '', ''); setToggle('category'); }}>Dark Fantasy</span>
                    </div>
                </div>
                <Link onClick={() => (setToggle('home'))} to='/'>About Us</Link>
            </nav>

            <div className='icons'>
                <i className='fa-solid fa-magnifying-glass' onClick={() => search()}></i>
                <Search setToggle={setToggle}/>
                <div className='user'>
                    {user && <Link to='/user-info'><i className='fa-regular fa-user'></i></Link>}
                    {!user && <Link to='/login'><i className='fa-regular fa-user'></i></Link>}
                    {user && <span>{user.user.username}</span>}
                </div>
                
                <i className='fa-solid fa-cart-shopping' onClick={() => handleClick()}></i>
            </div>
        </header>
    )
}
