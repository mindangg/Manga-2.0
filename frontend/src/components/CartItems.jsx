import React, { useState } from 'react'

import '../styles/CartItems.css'

export default function CartItems({ cart }) {
    const [quantity, setQuantity] = useState(1)

    console.log(cart)

    return (
        <div className='cart-item'>
            <div className='cart-info'>
                {cart.MangaID && <img src={`http://localhost:4000/${cart.MangaID.cover1}`}></img>}
                <div>
                    <p>{cart.MangaID && cart.MangaID.title}</p>
                </div>
            </div>
            <div className='cart-quantity'>
                <div>
                    <button id='cart-quantitydown'
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={quantity === 1}
                            >-</button>
                    <input id='cart-quantity' 
                            type='number'
                            value={quantity}
                            onChange={() => setQuantity()}></input>
                    <button id='cart-quantityup'
                            onClick={() => setQuantity((next) => next + 1)}
                            >+</button>
                </div>
            </div>
            <div className='cart-total'>
                <p>{cart.MangaID && cart.MangaID.price * quantity}</p>
            </div>
            <div className='cart-delete'>
                <button id='cart-quantityremove'>Remove</button>
            </div>
        </div>
    )
}
