import React, { useEffect, useState } from 'react'
import '../styles/Checkout.css'

import QR from '../assets/QR.jpg'

import CheckoutItems from '../components/CheckoutItems'

import { useAuthContext } from '../hooks/useAuthContext'

export default function Checkout() {
    const { user } = useAuthContext()
    const [order, setOrder] = useState([])

    useEffect(() => {
        if (!user) 
            return

        const fetchOrder = async () => {
            const response = await fetch('http://localhost:4000/cart', {
                headers: {
                    'Authoriztion': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (response.ok) {
                setOrder(json)
                console.log(order)
            }

            if (!response.ok) {
                setOrder([])
                console.log('Error fetch cart for checkout')
            }
        }

        fetchOrder()
    }, [user])


    return (
        <div id='billing-info'>
            <div style={{marginRight: 20 + 'px'}}>
                <div className='billing-form' id='billing-form'>
                    <h2>Billing Information</h2>
                    <select id='selectAddressOrder'>
                        <option value='userAddress' defaultValue={true}>Address and user information</option>
                        <option value='newAddress'>New address and user information</option>
                    </select>
                    <label>Full Name</label>
                    <div className='billing-info-input'>
                        <input id='billing-info-fullName' type='text' placeholder='Full Name' className='form-group'></input>
                        <label className='error'></label>
                    </div>
                    <div className='billing-info-input'>
                        <label>Phone Number</label>
                        <input id='billing-info-phoneNumber' type='text' placeholder='Phone Number' className='form-group'></input>
                        <label className='error'></label>
                    </div>
                    <div id='newAddress'>
                        <div className='billing-info-input'>
                            <label>House Number</label>
                            <input id='billing-info-houseNumber' type='text' placeholder='House Number' className='form-group'></input>
                            <label className='form-group'></label>
                        </div>
                        <div className='billing-info-input'>
                            <label>Street</label>
                            <input id='billing-info-street' type='text' placeholder='Street' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>Ward</label>
                            <input id='billing-info-ward' type='text' placeholder='Ward' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>District</label>
                            <input id='billing-info-district' type='text' placeholder='District' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>City</label>
                            <input id='billing-info-city' type='text' placeholder='City' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                    </div>
                </div>
                <div id='Payment-form'>
                    <h2>Payment</h2>
                    <select id='selectPaymentOrder'>
                        <option value='cashPayment' defaultValue={true}>Cash On Delivery</option>
                        <option value='creditCard'>Payment By Transfer</option>
                    </select>
                    <div id='paymentByCard' style={{display: 'none'}}>
                        <img src={QR} style={{width: 200 + 'px'}}></img>
                        <select id='selectBankOrder'>
                            <option value='Agribank' defaultValue={true}>Agribank</option>
                            <option value='ACB'>ACB</option>
                            <option value='Vietcombank'>Vietcombank</option>
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

                <button className='paynow-btn' type='button' onclick='Order.handlePayNow()'>Pay Now</button>
            </div>
            </div>

            <div className='payment-info'>
                <div className='payment-info-container'>
                    {order.map((o, _) => {
                        <CheckoutItems order={o} />
                    })}
                </div>
                <div className='payment-info-summary'>
                    <div className='subtotal'>
                        <span>Subtotal • 4 items</span>
                        <span>$149.99</span>
                    </div>
                    <div className='total'>
                        <span>Total</span>
                        <span className='order-price'>$149.99 USD</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
