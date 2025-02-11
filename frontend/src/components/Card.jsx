import React from 'react'
import '../styles/Card.css'
import cover1 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'
import cover2 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-back.jpg'

export default function Card({ manga }) {
    const showProductInfo = () => {

    }
    
    return (
        <div className="card">
            <a id={manga._id} onclick={showProductInfo}>
                <img src={cover1}></img>
                <img src={cover2}></img>
            </a>
            <h4>{manga.title}</h4>
            <p>${manga.price}</p>
            <button id={manga._id}>+ Add to cart</button>
        </div>
  )
}
