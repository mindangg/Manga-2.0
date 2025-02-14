import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

import { useLogin } from '../hooks/useLogin'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <form id='login' onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className='login__input'>
                <input type='text' id='login__input--username' placeholder='Username'
                        value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='login__input'>
                <input type='password' id='login__input--password' placeholder='Password'
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type='submit' id='login__btn' disabled={isLoading}>Login</button>

            <div id='login__signup'>
                <Link to='/signup' id='login__signup--nav'>Sign Up</Link>
            </div>
            
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
