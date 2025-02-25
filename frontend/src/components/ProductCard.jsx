import React from 'react'

import img from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'

import '../styles/ProductCard.css'

export default function ProductCard() {
    return (
        <div className='product-card'>
            <div className='display'>
                <img src={img}></img>
            </div>
            <div className='info'>
                <h3>Title</h3>
                <span>Category</span>
                <span>Stock: </span>
                <span>Author</span>
            </div>
            <div className='action'>
                <div>
                    $5.99
                </div>
                <div>
                    <i className='fa-regular fa-pen-to-square'></i>
                    <i className='fa-solid fa-trash-can'></i>
                </div>
            </div>
        </div>
    )
}
