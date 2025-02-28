import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Header.css'
import Search from './Search'

import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export default function Header() {
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()
    const navigate = useNavigate()

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

    return (
        <header>
            <div className='logo'>
                <Link to='/'><img src={logo}></img></Link>
            </div>

            <nav className='navbar'>
                <Link to='/'>Home</Link>
                <Link to='/product'>Product</Link>
                <div className='category'>
                    <Link>Category</Link>
                    <div className='category-dropdown'>
                        <Link to='/product/shounen'>Shounen</Link>
                        <Link to='/product/seinen'>Seinen</Link>
                        <Link to='/product/rom-com'>Rom Com</Link>
                        <Link to='/product/action'>Action</Link>
                        <Link to='/product/family'>Family</Link>
                        <Link to='/product/comedy'>Comedy</Link>
                        <Link to='/product/fantasy'>Fantasy</Link>
                        <Link to='/product/dark-fantasy'>Dark Fantasy</Link>
                    </div>
                </div>
                <Link to='/'>About Us</Link>
            </nav>

            <div className='icons'>
                <i className='fa-solid fa-magnifying-glass' onClick={() => search()}></i>
                <Search/>
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
