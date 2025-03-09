import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

export const useAddToCart = () => {
    const { cart, dispatch } = useCartContext()
    const { user } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const addToCart = async (mangaID) => {
        if (!user) {
            showNotification('Please log in to add to cart')
            // console.error('User not logged in')
            return
        }
    
        // if (cart.some(item => item.mangaID === mangaID)) {
        //     showNotification('Product is already in cart')
        //     console.log(cart)
        //     return
        // }

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
            console.log(json)

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

    const handleDelete = async (userID, mangaID) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userID}/${mangaID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const json = await response.json()
    
            if (response.ok) {
                dispatch({type: 'DELETE_ITEM', payload: json})
            }
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
            console.log(json)
    
            if (response.ok) {
                dispatch({type: 'UPDATE_QUANTITY', payload: json})
            }
        }
        catch (error){
            console.error(error)
        }
    }

    return { addToCart, handleDelete, handleQuantity }
}
