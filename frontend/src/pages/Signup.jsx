import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSignup } from '../hooks/useSignup'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password, phone, address)
    }

    return (
        <form id='signup' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div className='signup-input'>
                <input type='text' id='signup-input--username' placeholder='Username' 
                        value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='email' id='signup-input--email' placeholder='Email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='password' id='signup-input--password' placeholder='Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='tel' id='signup-input--phone' placeholder='Phone Number' 
                        value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='text' id='signup-input--address' placeholder='Address' 
                        value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>

            <button type='submit' id='signup-btn' disabled={isLoading}>Create account</button>

            <div id='signup-login'>
                <Link to='/login' id='signup-login--nav'>Already has account?</Link>
            </div>

            {error && <div className='error'>{error}</div>}
        </form>
    )
}
