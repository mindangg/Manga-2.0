import React from 'react'
import cover1 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'

import '../styles/CartItems.css'

export default function CartItems() {

    return (
        <div className='cart__items'>
            <div className='cart__info'>
                <img src={cover1}></img>
                <div>
                    <p>Manga</p>
                    <p>19.9</p>
                </div>

            </div>
            <div className='cart__quantity'>
                <input value={10}></input><br></br>
                <button>Remove</button>
            </div>
            <div className='cart__total'>
                <p>$19</p>
            </div>
        </div>
    )
}
