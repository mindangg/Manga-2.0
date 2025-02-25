import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Header.css'
import Search from './Search'

import { useAuthContext } from '../hooks/useAuthContext'

export default function Header() {
    const { user } = useAuthContext()

    const search = () => {
        document.querySelector(".search-popup").style.display = "flex";
        document.querySelector(".search").style.animationName = "rightToLeft"
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
                    <Link to='/category'>Category</Link>
                    <div className='category-dropdown'>
                        <Link to='/category/shounen'>Shounen</Link>
                        <Link to='/category/seinen'>Seinen</Link>
                        <Link to='/category/rom-com'>Rom Com</Link>
                        <Link to='/category/action'>Action</Link>
                        <Link to='/category/family'>Family</Link>
                        <Link to='/category/comedy'>Comedy</Link>
                        <Link to='/category/fantasy'>Fantasy</Link>
                        <Link to='/category/dark-fantasy'>Dark Fantasy</Link>
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
                <Link to='/cart'><i className='fa-solid fa-cart-shopping'></i></Link>
            </div>
        </header>
    )
}
