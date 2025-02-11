import React from 'react'
import CartItems from '../components/CartItems'

import '../styles/Cart.css'

export default function Cart() {
    return (
        <div className='cart__container' style={{marginTop: 200  + 'px'}}>
            <h1>Cart</h1>
            <div className="cart__content">
                <div className='cart_desc'>
                    <h3>Product</h3>
                    <h3>Quantity</h3>
                    <h3>Total</h3>
                </div>

                <hr></hr>

                <div className='cart__items'>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                </div>

                <div className='cart__summary'>
                    <h3>Total of order: $30</h3>
                    <button id='checkout__btn'>Checkout</button>
                </div>
            </div>
        </div>
    )
}
