import React, { useEffect, useState } from 'react'

import '../styles/CartItems.css'

import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function CartItems({ cart }) {
    const [quantity, setQuantity] = useState(1)
    const { dispatch } = useCartContext() 
    const { user } = useAuthContext() 

    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/cart/' + cart._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ITEM', payload: json})
        }
    }

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
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={quantity === 1}
                            >-</button>
                    <input id='cart-quantity' 
                            type='number'
                            value={quantity}
                            readOnly></input>
                    <button id='cart-quantityup'
                            onClick={() => setQuantity((next) => next + 1)}
                            >+</button>
                </div>
            </div>
            <div className='cart-total'>
                <p>{cart.mangaID && (cart.mangaID.price * quantity).toFixed(2)}</p>
            </div>
            <div className='cart-delete'>
                <button id='cart-quantityremove' onClick={() => handleDelete()}>Remove</button>
            </div>
        </div>
    )
}
