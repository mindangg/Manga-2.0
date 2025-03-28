import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSignup } from '../hooks/useSignup'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')

    const { signup, error, setError, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password, phone, address)
    }

    return (
        <form id='signup' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div className='signup-input'>
                <input type='text' placeholder='Username' 
                        value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='email' placeholder='Email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='tel' placeholder='Phone Number' 
                        value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='password' placeholder='Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='text' placeholder='Address' 
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
