import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export const useAddToCart = () => {
    const { dispatch } = useCartContext()
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const addToCart = async (mangaID) => {
        if (!user) {
            showNotification('Please log in to add to cart')
            // console.error('User not logged in')
            return
        }

        try {
            const response = await fetch('http://localhost:4000/api/cart', {
                method: 'POST',
                body: JSON.stringify({ userID: user.user._id, mangaID }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            
            const json = await response.json()
            // console.log(json)

            if (!response.ok) {
                console.error('Failed to add to cart:', json)
                return
            }

            showNotification('Added to cart')
            dispatch({type: 'ADD_ITEM', payload: json})
        } 
        catch (error) {
            console.error('Error adding to cart:', error)
        }
    }

    const handleDelete = async (cartID, userID, mangaID) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userID}/${mangaID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            if (!response.ok) {
                console.error('Failed to delete item in cart:', json)
                return
            }

            dispatch({type: 'DELETE_ITEM', payload: cartID})
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleQuantity = async (cartID, userID, mangaID, type) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/quantity/${cartID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userID, mangaID, type })
            })
    
            const json = await response.json()
            // console.log(json)
    
            if (!response.ok) {
                console.error('Failed to update quantity of item in cart:', json)
                return
            }
            
            const updatedCart = json.items.find((i) => i.mangaID.toString() === mangaID.toString())
            // console.log(updatedCart.quantity)
            if (!updatedCart)
                dispatch({type: 'DELETE_ITEM', payload: cartID})
            else
                dispatch({type: 'UPDATE_QUANTITY', payload: updatedCart})

        }
        catch (error){
            console.error(error)
        }
    }

    return { addToCart, handleDelete, handleQuantity }
}
