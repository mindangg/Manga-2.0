import React, { useEffect } from 'react'
import CartItems from '../components/CartItems'

import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

import { Link } from 'react-router-dom'

import '../styles/Cart.css'

export default function Cart() {
    const { cart, dispatch } = useCartContext()
    const { user } = useAuthContext()

    useEffect(() => {
        if (!user) 
            return
        
        const fetchCart = async () => {
            const response = await fetch('http://localhost:4000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            
            const json = await response.json()
            // console.log(json)

            if (response.ok) {
                dispatch({ type: 'DISPLAY_ITEM', payload: json })
            }
        }

        fetchCart()

    }, [dispatch, user])

    return (
        <>
            {(!cart || !Array.isArray(cart.items) || cart.items.length === 0) ? (
                <div className='cart-empty'>
                    <i className='fa-solid fa-bag-shopping'></i>
                    <h2>Your cart is empty</h2>
                    <Link to='/'><button>Continue shopping</button></Link>
                </div>
            ) : (
                <div className='cart'>
                    <h2>Cart</h2>
                    <div className='cart-display'>
                        <div className='cart-desc'>
                            <h3>Product</h3>
                            <h3>Quantity</h3>
                            <h3>Total</h3>
                        </div>

                        <div className='cart-items'>
                            {cart.items?.map((c) => (
                                <CartItems key={c._id} cart={c} />
                            ))}
                        </div>
                    </div>
                    <div className='cart-summary'>
                        <h3>Total of order: ${cart.items.reduce((total, item) => 
                                            total + item.quantity * item.price, 0).toFixed(2)}</h3>
                        <Link to='/checkout'><button id='checkout-btn'>Checkout</button></Link>
                    </div>
                </div>
            )}
        </>
    )
}
