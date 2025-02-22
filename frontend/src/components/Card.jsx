import React from 'react'
import '../styles/Card.css'

import { useCardDetailsContext } from '../hooks/useCardDetailsContext'

export default function Card({ manga }) {
    const { showProductInfo } = useCardDetailsContext()

    return (
        <div className='card'>
            <a id={manga._id} onClick={() => showProductInfo(manga._id)}>
                <img src={`http://localhost:4000/${manga.cover1}`}></img>
                <img src={`http://localhost:4000/${manga.cover2}`}></img>
            </a>
            <h4>{manga.title}</h4>
            <p>${manga.price}</p>
            <button id={manga._id}>+ Add to cart</button>
        </div>
  )
}
