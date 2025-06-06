import React, { useState, useEffect } from 'react'

import '../styles/Cart.css'

import { useAddToCart } from '../hooks/useAddToCart'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

import Confirm from './Confirm'

export default function CartItems({ cart }) {
    const { handleDelete, handleQuantity } = useAddToCart()
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()
    const [showConfirm, setShowConfirm] = useState(false)

    const [inputValue, setInputValue] = useState(cart.quantity)

    const handleInputChange = (e) => {
        const value = e.target.value
        if (!/^\d*$/.test(value)) 
            return
        setInputValue(value)
    }

    const handleBlur = () => {
        const value = parseInt(inputValue)
        if (!value || value < 1) {
            setInputValue(cart.quantity)
            showNotification('Quantity can not be lower than 1')
            return
        }

        if (!value || value > cart.mangaID.stock) {
            setInputValue(cart.quantity)
            showNotification(`Quantity can not be higher than ${cart.mangaID.stock}`)
            return
        }

        if (value !== cart.quantity)
            handleQuantity(cart._id, user.user._id, cart.mangaID._id, value)
    }
    
    useEffect(() => {
        setInputValue(cart.quantity)
    }, [cart.quantity])

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
                            disabled={cart.quantity === 1}
                            >-</button>
                    <input
                        id='cart-quantity'
                        type='number'
                        min='1'
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />

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
                <button id='cart-quantityremove' onClick={() => setShowConfirm(true)}>Remove</button>
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
