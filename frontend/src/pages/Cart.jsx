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
            try {
                const response = await fetch('http://localhost:4000/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
    
                if (!response.ok)
                    return console.error('Error fetching cart:', response.status)
                
                const json = await response.json()
    
                dispatch({type: 'DISPLAY_ITEM', payload: json})
                // console.log(cart)
            }
            catch (error) {
                console.error('Error fetching cart:', error)
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
                            {cart && cart.items.map((c) => (
                                <CartItems key={c.mangaID?._id} cart={c} />
                            ))}
                        </div>
                    </div>
                    <div className='cart-summary'>
                        <h3>Total of order: ${cart && cart.items.reduce((total, item) => total + 
                                item.quantity * (item.mangaID && item.mangaID.priceOut || 0), 0).toFixed(2)}</h3>
                        <Link to='/checkout'><button id='checkout-btn'>Checkout</button></Link>
                    </div>
                </div>
            )}
        </>
    )
}
