import React, { useEffect, useState } from 'react'
import cover1 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'
import cover2 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-back.jpg'

import '../styles/CardDetails.css'

export default function CardDetails({ id, manga }) {
    const [selectedImage, setSelectedImage] = useState(cover1); 
    const [isProductVisible, setIsProductVisible] = useState(true); 

    const changeProductView = (img) => {
        setSelectedImage(img)
    }

    const closeProduct = () => {
        // document.querySelector('.product').style.animationName = 'bottomUp'
        // setTimeout(function () {
        //     document.querySelector('.product__page').style.display = 'none'
        // }, 365)

        setIsProductVisible(false)
    }

    if (!isProductVisible) return null

    return (
    <div className='product__page' style={isProductVisible ? { display: 'inline', animation: 'topDown' } : { animation: 'bottomUp', display: 'none' }}>
        <div className='product'>
            <a id='product__close' onClick={() => closeProduct()}><i className='fa-solid fa-xmark'></i></a>
            <div className='product__img'>
                <img id='product__img1' src={selectedImage}></img>
                <img id='product__img2' src={cover2} style={{ opacity: selectedImage === cover1 ? 0 : 1 }}></img>

                <a id='product__view1' onClick={() => changeProductView(cover1)}><img src={cover1}></img></a>
                <a id='product__view2' onClick={() => changeProductView(cover2)}><img src={cover2}></img></a>
            </div>

            <div className='product__info'>
                <h1>{manga.title}</h1>
                <div className='product__info--rating'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                </div>
                <p>Price: ${manga.price}</p>
                <p>Author:</p>
                <h2>{manga.author}</h2>
                <p>{manga.category}</p><br></br>
                <button>Add to cart</button>

                <button id='quantitydown'></button>
                <input id='quantity'></input>
                <button id='quantityup'></button>

                <p>Availability: ${manga.quantity}</p><br></br>
                <h3>Description: </h3><br></br>
                <p>{manga.description}</p>
            </div>
        </div>
    </div>
    )
}
