import React, { useState } from 'react'

import '../styles/Cart.css'

import { useAddToCart } from '../hooks/useAddToCart'
import { useAuthContext } from '../hooks/useAuthContext'

import Confirm from './Confirm'

export default function CartItems({ cart }) {
    const { handleDelete, handleQuantity } = useAddToCart()
    const { user } = useAuthContext()
    const [showConfirm, setShowConfirm] = useState(false)

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
                            value={cart && cart.quantity} 
                            readOnly></input>
                    <button id='cart-quantityup'
                            onClick={() => handleQuantity(cart._id, user.user._id, 
                                                            cart.mangaID._id, 'increase')}
                            >+</button>
                </div>
            </div>
            <div className='cart-total'>
                <p>{cart.mangaID && (cart.mangaID.priceOut * cart.quantity).toFixed(2)}</p>
            </div>
            <div className='cart-delete'>
                <button id='cart-quantityremove'  onClick={() => setShowConfirm(true)}>Remove</button>
            </div>
            {showConfirm && (
                <Confirm
                    message='Are you sure you want to remove from cart?'
                    onConfirm={() => handleDelete(cart._id, user.user._id, cart.mangaID._id)}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
