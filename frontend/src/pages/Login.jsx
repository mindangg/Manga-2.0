import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
    return (
        <div id='login'>
            <h1>Login</h1>

            <div className='login__input'>
                <input type='text' id='login__input--username' placeholder='Username' required value=''></input>
            </div>

            <div className='login__input'>
                <input type='password' id='login__input--password' placeholder='Password' required value=''></input>
                <label for='login__input--password'></label>
            </div>
            <button type='submit' id='login__btn'>Login</button>

            <div id='login__signup'>
                <Link to='/signup'><a id='login__signup--nav'>Sign Up</a></Link>
            </div>
        </div>
    )
}
