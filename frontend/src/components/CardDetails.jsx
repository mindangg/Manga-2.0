import React, { useEffect, useState } from 'react'

import '../styles/CardDetails.css'

import { useCardDetailsContext } from '../hooks/useCardDetailsContext'

export default function CardDetails() {
    const { manga, clearManga  } = useCardDetailsContext()

    const [selectedImage, setSelectedImage] = useState(manga ? `http://localhost:4000/${manga.cover1}` : ''); 
    const [isVisible, setIsVisible] = useState(false);
    const [quantity, setQuantity] = useState(1); 

    const changeProductView = (img) => {
        setSelectedImage(img)
    }

    const closeProduct = () => {
        // document.querySelector('.product').style.animationName = 'bottomUp'
        // setTimeout(function () {
        //     document.querySelector('.product__page').style.display = 'none'
        // }, 365)

        setIsVisible(false)
        clearManga()
    }

    useEffect(() => {
        if (manga) {
            setIsVisible(true)
            setSelectedImage(`http://localhost:4000/${manga.cover1}`)
        } 
        else
            setIsVisible(false)
        
        }, [manga]);

    if(manga){
        return (
        <div className='product__page' style={isVisible ? { display: 'inline', animation: 'topDown' } : { animation: 'bottomUp', display: 'none' }}>
            <div className='product'>
                <a id='product__close' onClick={() => closeProduct()}><i className='fa-solid fa-xmark'></i></a>
                <div className='product__img'>
                    <img id='product__img1' src={selectedImage}></img>
                    <img id='product__img2' src={`http://localhost:4000/${manga.cover2}`} style={{ opacity: selectedImage === manga.cover1 ? 0 : 1 }}></img>

                    <a id='product__view1' onClick={() => changeProductView(`http://localhost:4000/${manga.cover1}`)}><img src={`http://localhost:4000/${manga.cover1}`}></img></a>
                    <a id='product__view2' onClick={() => changeProductView(`http://localhost:4000/${manga.cover2}`)}><img src={`http://localhost:4000/${manga.cover2}`}></img></a>
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
                    <p>{manga.category}</p><br/>
                    <button>Add to cart</button><br/>

                    <div className='carddetails-quantity'>
                        <button id='quantitydown'
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                disabled={quantity === 1}
                                >-</button>
                        <input id='quantity'
                                type='number'
                                value={quantity}>
                                </input>
                        <button id='quantityup'
                                onClick={() => setQuantity((next) => next + 1)}
                                >+</button>
                    </div>

                    <p>Stock: {manga.stock}</p><br/>
                    <h3>Description: </h3><br/>
                    <p>{manga.description}</p>
                </div>
            </div>
        </div>
        )
    }
}
