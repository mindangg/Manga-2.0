import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

import QR from '../assets/QR.jpg'

import CheckoutItems from '../components/CheckoutItems'

import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

import { useNotificationContext } from '../hooks/useNotificationContext'

export default function Checkout() {
    const { cart, dispatch } = useCartContext()
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const navigate = useNavigate()

    const [method, setMethod] = useState('cash')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')

    const handlePayment = (methodCheck) => {
        setMethod(methodCheck)
    }

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
            console.log(json)

            if (response.ok) {
                dispatch({ type: 'DISPLAY_ITEM', payload: json })
            }
        }

        fetchCart()

    }, [dispatch, user])

    const handleCheckout = async () => {
        if (method === 'card')
            if (cardNumber === '' || cardName === '') {
                console.log('Missing card number or name')
                return
            }

        try {
            const response = await fetch('http://localhost:4000/api/order', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: user.user._id, cartID: cart._id })
            })

            if (!response.ok)
                return console.error('Error fetching order:', response.status)

            dispatch({type: 'CLEAR_ITEM'})
            navigate('/user-info')
            showNotification('Successfully placed order')
        }
        catch (error) {
            console.error('Checkout failed:', error)
        }
    }

    return (
        <div id='billing-info'>
            <div style={{marginRight: 20 + 'px'}}>
                <div className='billing-form'>
                    <h2>Billing Information</h2>
                    <h3 style={{marginBottom: '15px'}}>Address and user information</h3>
                    <label>Email</label>
                    <div className='billing-info-input'>
                        <input type='text' placeholder='Email' value={user && user.user.email} readOnly></input>
                    </div>
                    <div className='billing-info-input'>
                        <label>Phone Number</label>
                        <input type='text' placeholder='Phone Number' value={user && user.user.phone} readOnly></input>
                    </div>
                    <div>
                        <div className='billing-info-input'>
                            <label>Address</label>
                            <input type='text' placeholder='Address' value={user && user.user.address} readOnly></input>
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
                            <select defaultValue='Vietcombank'>
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
                                <input id='billing-info--cardnumber' type='text' placeholder='Card Number' className='form-group'
                                                    value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}></input>
                                <label className='error'></label>
                            </div>
                            <div className='billing-info-input'>
                                <label>Name On Card</label>
                                <input id='billing-info-nameoncard' type='text' placeholder='Name On Card' className='form-group'
                                                    value={cardName} onChange={(e) => setCardName(e.target.value)}></input>
                                <label className='error' ></label>
                            </div>
                        </div>
                    )}

                <button className='paynow-btn' type='button' onClick={handleCheckout}>Pay Now</button>
            </div>
            </div>

            <div className='payment-info'>
                <div className='payment-info-container'>
                    {cart.items.map((c, _) => (
                        <CheckoutItems key={c._id} order={c} />
                    ))}
                </div>
                <div className='payment-info-summary'>
                    <div className='subtotal'>
                        <span>Subtotal • {cart.length} items</span>
                        <span>${cart.items.reduce((total, item) => 
                                            total + item.quantity * item.mangaID.price, 0).toFixed(2)}</span>
                    </div>
                    <div className='total'>
                        <span>Total</span>
                        <span className='order-price'>${cart.items.reduce((total, item) => 
                                            total + item.quantity * item.mangaID.price, 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
