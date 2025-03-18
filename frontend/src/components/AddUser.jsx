import React, { use, useState } from 'react';
import '../styles/Admin.css';

import { useUserContext } from '../hooks/useUserContext';

export default function AddCustomer({ toggleAdd }) {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const { dispatch } = useUserContext()

    const handleUpload = async (e) => {
        e.preventDefault()
        console.log('Form submitted!')

        try {
            const response = await fetch('http://localhost:4000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, phone, address })
            })

            if (!response.ok)
                console.error('Failed to add user')

            const json = await response.json()

            dispatch({type: 'ADD_ITEM', payload: json})
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='add-user-container'>
            <div className='add-user'>
                <i className="fa-solid fa-xmark" onClick={toggleAdd}></i>
                <h2>Add new customer</h2>
                <form>
                    <label>User name</label>
                    <input type='text' placeholder='User name' required />

                    <label>Full name</label>
                    <input type='text' placeholder='Name' required />

                    <label>Email</label>
                    <input type='text' placeholder='abc@gmail.com' required />

                    <label>Password</label>
                    <input type='text' placeholder='Password' required />

                    <label>Phone number</label>
                    <input type='text' placeholder='Phone numer' required />

                    <label>Address</label>
                    <input type='address' placeholder='Address' required />

                    <div style={{textAlign: 'center'}}>
                        <button type='submit' onClick={handleUpload}>+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
