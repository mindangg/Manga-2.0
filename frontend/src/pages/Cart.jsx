import React from 'react'
import CartItems from '../components/CartItems'

import { Link } from 'react-router-dom'

import '../styles/Cart.css'

export default function Cart() {
    return (
        <div className='cart'>
            <h2>Cart</h2>
            <div className='cart-display'>
                <div className='cart-desc'>
                    <h3>Product</h3>
                    <h3>Quantity</h3>
                    <h3>Total</h3>
                </div>

                <div className='cart-items'>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                </div>
            </div>
            <div className='cart-summary'>
                <h3>Total of order: $30</h3>
                <Link to='/checkout'><button id='checkout-btn'>Checkout</button></Link>
            </div>
        </div>
    )
}
