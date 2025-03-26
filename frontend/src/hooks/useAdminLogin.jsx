import { useState } from 'react'
import { useAdminContext } from './useAdminContext'
import { useNotificationContext } from './useNotificationContext'

export const useAdminLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAdminContext()
    const { showNotification } = useNotificationContext()

    const login = async (phone, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/employee/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, password })
        })
    
        const json = await response.json()
    
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
    
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('employee', JSON.stringify(json))

            // show notification login
            showNotification(`Hello ${phone}`)
            
            // update the admin context
            dispatch({type: 'LOGIN', payload: json})
    
            setIsLoading(false)
        }
    }

    return { login, error, isLoading }
}