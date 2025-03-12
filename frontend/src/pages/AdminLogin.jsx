import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import '../styles/Admin.css'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <div className='admin-login-container'>
            <form id='admin-login' onSubmit={handleSubmit}>
                <h1>Admin</h1>

                <div className='admin-login-input'>
                    <input type='text' id='login-input--username' placeholder='Phone number'
                            value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className='admin-login-input'>
                    <input type='password' id='login-input--password' placeholder='Password'
                            value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type='submit' id='admin-login-btn'>Login</button>
                
                {/* {error && <div className='error'>{error}</div>} */}
            </form>
        </div>
    )
}
