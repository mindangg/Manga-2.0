import React, { useState } from 'react'

import { Link } from 'react-router-dom'

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
            <form id='login' onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className='login-input'>
                    <input type='text' id='login-input--username' placeholder='Username'
                            value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className='login-input'>
                    <input type='password' id='login-input--password' placeholder='Password'
                            value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type='submit' id='login-btn'>Login</button>

                <div id='login-signup'>
                    <Link to='/signup' id='login-signup--nav'>Sign Up</Link>
                </div>
                
                {/* {error && <div className='error'>{error}</div>} */}
            </form>
        </div>
    )
}
