import React, { useEffect, useState } from 'react'
import '../styles/Checkout.css'

import QR from '../assets/QR.jpg'

import CheckoutItems from '../components/CheckoutItems'

import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Checkout() {
    const { cart, dispatch } = useCartContext()
    const { user } = useAuthContext()

    const [method, setMethod] = useState('cash')

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

    const handlePayment = (methodCheck) => {
        if (methodCheck === 'cash')
            setMethod('cash')

        if (methodCheck === 'qr')
            setMethod('qr')

        if (methodCheck === 'card')
            setMethod('card')

        console.log(method)
    }

    return (
        <div id='billing-info'>
            <div style={{marginRight: 20 + 'px'}}>
                <div className='billing-form'>
                    <h2>Billing Information</h2>
                    <select id='selectAddressOrder'>
                        <option value='userAddress' defaultValue={true}>Address and user information</option>
                        <option value='newAddress'>New address and user information</option>
                    </select>
                    <label>Full Name</label>
                    <div className='billing-info-input'>
                        <input itype='text' placeholder='Full Name'></input>
                        <label className='error'></label>
                    </div>
                    <div className='billing-info-input'>
                        <label>Phone Number</label>
                        <input type='text' placeholder='Phone Number'></input>
                        <label className='error'></label>
                    </div>
                    <div id='newAddress'>
                        <div className='billing-info-input'>
                            <label>Address</label>
                            <input type='text' placeholder='Address'></input>
                            <label className='form-group'></label>
                        </div>
                    </div>
                </div>
                <div id='Payment-form'>
                    <h2>Payment</h2>
                    <select defaultValue='cash' onChange={(e) => handlePayment(e.target.value)}>
                        <option value='cash'>Cash On Delivery</option>
                        <option value='qr'>Payment By QR</option>
                        <option value='card'>Payment By Card</option>
                    </select>

                    {method === 'qr' && (
                        <div id='paymentByQR'>
                            <img src={QR} style={{width: 200 + 'px'}}></img>
                        </div>
                    )}

                    {method === 'card' && (
                        <div id='paymentByCard'>
                            <select  defaultValue='Vietcombank'>
                                <option value='Vietcombank'>Vietcombank</option>
                                <option value='Agribank'>Agribank</option>
                                <option value='ACB'>ACB</option>
                                <option value='Vietinbank'>Vietinbank</option>
                                <option value='Techcombank'>Techcombank</option>
                                <option value='BIDV'>BIDV</option>
                                <option value='MB'>MB</option>
                                <option value='VPBank'>VPBank</option>
                                <option value='TPBank'>TPBank</option>
                                <option value='VIB'>VIB</option>
                            </select>
                            <div className='billing-info-input'>
                                <label>Card Number</label>
                                <input id='billing-info--cardnumber' type='text' placeholder='Card Number' className='form-group'></input>
                                <label className='error'></label>
                            </div>
                            <div className='billing-info-input'>
                                <label>Name On Card</label>
                                <input id='billing-info-nameoncard' type='text' placeholder='Name On Card' className='form-group'></input>
                                <label className='error' ></label>
                            </div>
                        </div>
                    )}


                <button className='paynow-btn' type='button'>Pay Now</button>
            </div>
            </div>

            <div className='payment-info'>
                <div className='payment-info-container'>
                    {cart.map((c, _) => (
                        <CheckoutItems key={c._id} order={c} />
                    ))}
                </div>
                <div className='payment-info-summary'>
                    <div className='subtotal'>
                        <span>Subtotal • {cart.length} items</span>
                        <span>${cart.total}</span>
                    </div>
                    <div className='total'>
                        <span>Total</span>
                        <span className='order-price'>${cart.total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
