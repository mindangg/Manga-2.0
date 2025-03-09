import React, { useEffect, useState } from 'react'

import '../styles/Cart.css'

import { useAddToCart } from '../hooks/useAddToCart'
import { useAuthContext } from '../hooks/useAuthContext'

export default function CartItems({ cart }) {
    const [quantity, setQuantity] = useState(cart ? cart.quantity : 1)
    const { handleDelete, handleQuantity } = useAddToCart()
    const { user } = useAuthContext()

    return (
        <div className='cart-item'>
            <div className='cart-info'>
                {cart.mangaID && <img src={`http://localhost:4000/${cart.mangaID.cover1}`}></img>}
                <div>
                    <p>{cart.mangaID && cart.mangaID.title}</p>
                </div>
            </div>
            <div className='cart-quantity'>
                <div>
                    <button id='cart-quantitydown'
                            onClick={() => handleQuantity(cart._id, user.user._id, 
                                                            cart.mangaID._id, 'decrease')}
                            >-</button>
                    <input id='cart-quantity' 
                            type='number'
                            value={quantity}
                            readOnly></input>
                    <button id='cart-quantityup'
                            onClick={() => handleQuantity(cart._id, user.user._id, 
                                                            cart.mangaID._id, 'increase')}
                            >+</button>
                </div>
            </div>
            <div className='cart-total'>
                <p>{cart.mangaID && cart.mangaID.price}</p>
            </div>
            <div className='cart-delete'>
                <button id='cart-quantityremove' onClick={() => handleDelete(user.user._id, cart.mangaID._id)}>Remove</button>
            </div>
        </div>
    )
}
