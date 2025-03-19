import React, { useState } from 'react';
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
            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, fullname, email, password, phone, address })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            const json = await response.json()

            dispatch({type: 'ADD_USER', payload: json})
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
                    <input type='text' placeholder='User name' value={username} 
                                onChange={(e) => setUsername(e.target.value)}/>

                    <label>Full name</label>
                    <input type='text' placeholder='Name' value={fullname} 
                                onChange={(e) => setFullname(e.target.value)}/>

                    <label>Email</label>
                    <input type='text' placeholder='abc@gmail.com' value={email}
                                onChange={(e) => setEmail(e.target.value)}/>

                    <label>Password</label>
                    <input type='text' placeholder='Password' value={password}
                                onChange={(e) => setPassword(e.target.value)}/>

                    <label>Phone number</label>
                    <input type='text' placeholder='Phone numer' value={phone}
                                onChange={(e) => setPhone(e.target.value)}/>

                    <label>Address</label>
                    <input type='address' placeholder='Address' value={address}
                                onChange={(e) => setAddress(e.target.value)}/>

                    <div style={{textAlign: 'center'}}>
                        <button type='submit' onClick={handleUpload}>+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
