import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const signup = async (username, email, password, phone, address) => {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, phone, address })
        })
    
        const json = await response.json()
    
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
    
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // show notification login
            showNotification(`Hello ${username}`)
    
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
    
            setIsLoading(false)
        }
    }

    return { signup, error, setError, isLoading }
}