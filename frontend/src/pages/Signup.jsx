import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSignup } from '../hooks/useSignup'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const { signup, error, setError, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confPassword) {
            setError('Password does not match')
            console.log('not')
            return
        }

        await signup(username, email, password)
    }

    return (
        <form id='signup' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div className='signup-input'>
                <input type='text' placeholder='Username' 
                        value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='email' id='signup-input--email' placeholder='Email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='password' placeholder='Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div className='signup-input'>
                <input type='password' placeholder='Confirm Password' 
                        value={confPassword} onChange={(e) => setConfPassword(e.target.value)}></input>
            </div>

            <button type='submit' id='signup-btn' disabled={isLoading}>Create account</button>

            <div id='signup-login'>
                <Link to='/login' id='signup-login--nav'>Already has account?</Link>
            </div>

            {error && <div className='error'>{error}</div>}
        </form>
    )
}
