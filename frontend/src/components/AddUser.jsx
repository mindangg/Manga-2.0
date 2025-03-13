import React from 'react';
import '../styles/Admin.css';

export default function AddCustomer() {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted!')
    }

    return (
        <div className='add-user-container'>
            <div className='add-user'>
                <i className="fa-solid fa-xmark"></i>
                <h2>Add new customer</h2>
                <form onSubmit={handleSubmit}>
                    <label>User name</label>
                    <input type='text' id='usename' placeholder='User name' required />

                    <label>Full name</label>
                    <input type='text' id='fullname' placeholder='Name' required />

                    <label>Email</label>
                    <input type='text' id='email' placeholder='abc@gmail.com' required />

                    <label>Password</label>
                    <input type='text' id='passwprd' placeholder='Password' required />

                    <label>Phone number</label>
                    <input type='text' id='phone' placeholder='Phone numer' required />

                    <label>Address</label>
                    <input type='address' id='address' placeholder='Address' required />

                    <div style={{textAlign: 'center'}}>
                        <button type='submit'>+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
