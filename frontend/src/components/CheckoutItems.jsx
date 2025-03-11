import React from 'react'

import '../styles/Checkout.css'

export default function CheckoutItems({ order }) {
    return (
        <div class='payment-info-item'>
            {order.mangaID && <img src={`http://localhost:4000/${order.mangaID.cover1}`}></img>}
            <div class='quantity-circle'>{order.mangaID && order.quantity}</div>
            <div class='payment-info-item-details'>
                <p>{order.mangaID && order.mangaID.title}</p>
            </div>
            <div class='payment-info-item-price'>{order.mangaID && order.mangaID.price}</div>
        </div>
    )
}
