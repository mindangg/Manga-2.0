import React, { useState, useEffect } from 'react'
import { useNotificationContext } from '../hooks/useNotificationContext'

export default function () {
    const { message } = useNotificationContext();
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
            setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        } 
        else
            setIsVisible(false);
        
        }, [message]);
    
    return (
        <div id='notification' className={`notification ${isVisible ? 'show' : ''}`}>
            {message}
        </div>
    )
}
