import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

export default function Signup() {
    return (
        <div id="signup">
            <h1>Sign Up</h1>

            <div className="signup__input">
                <input type="text" id="signup__input--username" placeholder="Username" required value=""></input>
                <label for="signup__input--username"></label>
            </div>

            <div className="signup__input">
                <input type="password" id="signup__input--password" placeholder="Password" required></input>
                <label for="signup__input--password"></label>
            </div>

            <div className="signup__input">
                <input type="password" id="signup__input--confpasword" placeholder="Confirm Password" required></input>
                <label for="signup__input--confpasword"></label>
            </div>

            <div className="signup__input">
                <input type="email" id="signup__input--email" placeholder="Email" required></input>
                <label for="signup__input--email"></label>
            </div>

            <div className="signup__input">
                <input type="tel" id="signup__input--phone" placeholder="Phone Number" required></input>
                <label for="signup__input--phone"></label>
            </div>

            <button type="submit" id="signup__btn">Create account</button>

            <div id="signup__login">
                <Link to='/login'><a id="signup__login--nav">Already has account?</a></Link>
            </div>
        </div>
    )
}
