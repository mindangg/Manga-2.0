import React from 'react'
import '../styles/Checkout.css'

import QR from '../assets/QR.jpg'

export default function Checkout() {
    return (
        <div id='billing__info'>
            <div style={{marginRight: 20 + 'px'}}>
                <div className='billing__form' id='billing__form'>
                    <h2>Billing Information</h2>
                    <select id='selectAddressOrder'>
                        <option value='userAddress' defaultValue={true}>Address and user information</option>
                        <option value='newAddress'>New address and user information</option>
                    </select>
                    <label>Full Name</label>
                    <div className='billing__info__input'>
                        <input id='billing-info__fullName' type='text' placeholder='Full Name' className='form-group'></input>
                        <label className='error'></label>
                    </div>
                    <div className='billing__info__input'>
                        <label>Phone Number</label>
                        <input id='billing-info__phoneNumber' type='text' placeholder='Phone Number' className='form-group'></input>
                        <label className='error'></label>
                    </div>
                    <div id='newAddress'>
                        <div className='billing__info__input'>
                            <label>House Number</label>
                            <input id='billing-info__houseNumber' type='text' placeholder='House Number' className='form-group'></input>
                            <label className='form-group'></label>
                        </div>
                        <div className='billing__info__input'>
                            <label>Street</label>
                            <input id='billing-info__street' type='text' placeholder='Street' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>Ward</label>
                            <input id='billing-info__ward' type='text' placeholder='Ward' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>District</label>
                            <input id='billing-info__district' type='text' placeholder='District' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div>
                            <label>City</label>
                            <input id='billing-info__city' type='text' placeholder='City' className='form-group'></input>
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
                        <img src={QR} style={{width: 200+ 'px'}}></img>
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
                        <div className='billing__info__input'>
                            <label>Card Number</label>
                            <input id='billing__info____cardnumber' type='text' placeholder='Card Number' className='form-group'></input>
                            <label className='error'></label>
                        </div>
                        <div className='billing__info__input'>
                            <label>Name On Card</label>
                            <input id='billing__info__nameoncard' type='text' placeholder='Name On Card' className='form-group'></input>
                            <label className='error' ></label>
                        </div>
                    </div>

                <button className='paynow__btn' type='button' onclick='Order.handlePayNow()'>Pay Now</button>
            </div>
            </div>

            <div className='payment-info'>
                <div className='payment-info__container'>
                    {/* <div className='payment-info__item'>
                                <img src='https://via.placeholder.com/50' alt='Item Image'>
                                <div className='quantity-circle'>1</div>
                                <div className='payment-info__item-details'>
                                    <p>LORE OLYMPUS - GODDESS OF SPRING SATIN SHORTS</p>
                                </div>
                                <div className='payment-info__item-price'>$40.00</div>
                            </div> */}
                </div>
                <div className='payment-info__summary'>
                    {/* <div className='subtotal'>
                            <span>Subtotal • 4 items</span>
                            <span>$149.99</span>
                        </div>
                        <div className='total'>
                            <span>Total</span>
                            <span className='order-price'>$149.99 USD</span>
                        </div> */}
                </div>
            </div>
        </div>
    )
}
