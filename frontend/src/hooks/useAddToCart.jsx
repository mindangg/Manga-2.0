import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export const useAddToCart = () => {
    const { dispatch } = useCartContext()
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const addToCart = async (mangaID) => {
        if (!user || !user.user) {
            showNotification('Please log in to add to cart')
            console.error('User not logged in')
            return
        }

        try {
            const response = await fetch('http://localhost:4000/api/cart', {
                method: 'POST',
                body: JSON.stringify({ userID: user.user._id, mangaID }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const json = await response.json()

            if (!response.ok) {
                console.error('Failed to add to cart:', json)
                return
            }

            showNotification('Added to cart')
            dispatch({ type: 'ADD_ITEM', payload: json })
        } 
        catch (error) {
            console.error('Error adding to cart:', error)
        }
    }

    return { addToCart }
}
