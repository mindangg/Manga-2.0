import React, { useState } from 'react'
import '../styles/Card.css'

import CardDetails from './CardDetails'


export default function Card({ manga }) {
    const [mangaFind, setMangaFind] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showProductInfo = async (id) => {
        setIsLoading(true)

        const response = await fetch('http://localhost:4000/api/manga/' + id)

        if (response.ok) {
            const mangaData = await response.json()
            setMangaFind(mangaData)
            // document.querySelector('.product').style.animationName = 'topDown'
            // document.querySelector('.product__page').style.display = 'inline' 
        }

        setIsLoading(false)

        console.log(manga.cover1)
    }
    
    return (
        <>
            <div className='card'>
                <a id={manga._id} onClick={() => showProductInfo(manga._id)}>
                    <img src={manga.cover1}></img>
                    <img src={manga.cover2}></img>
                </a>
                <h4>{manga.title}</h4>
                <p>${manga.price}</p>
                <button id={manga._id}>+ Add to cart</button>
            </div>
            {mangaFind && !isLoading &&(
                <CardDetails id={manga._id} manga={mangaFind}/>
            )}
        </>
  )
}
