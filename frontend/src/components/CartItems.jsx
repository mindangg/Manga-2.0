import React, { useState } from 'react'
import cover1 from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'

import '../styles/CartItems.css'

export default function CartItems({ quantity }) {
    const [cartQuantity, setCartQuantity] = useState(1)

    return (
        <div className='cart-item'>
            <div className='cart-info'>
                <img src={cover1}></img>
                <div>
                    <p>My Dress Up Darling - Volume 01</p>
                </div>
            </div>
            <div className='cart-quantity'>
                <div>
                    <button id='cart-quantitydown'
                            onClick={() => setCartQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={cartQuantity === 1}
                            >-</button>
                    <input id='cart-quantity' 
                            type='number'
                            value={cartQuantity}></input>
                    <button id='cart-quantityup'
                            onClick={() => setCartQuantity((next) => next + 1)}
                            >+</button>
                </div>
            </div>
            <div className='cart-total'>
                <p>$19</p>
            </div>
            <div className='cart-delete'>
                <button id='cart-quantityremove'>Remove</button>
            </div>
        </div>
    )
}
