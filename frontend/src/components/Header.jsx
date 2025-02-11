import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../assets/WEBTOON_Logo.png'
import '../styles/Header.css'

export default function Header() {
    return (
        <header>
            <div className='logo'>
                <img src={logo}></img>
            </div>

            <nav className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/">Product</Link>
                <Link to="/">Category</Link>
                <Link to="/">About Us</Link>
            </nav>

            <div className='icons'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-regular fa-user"></i>
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
        </header>

    )
}
