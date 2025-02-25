import { CartContext } from '../contexts/CartContext'
import { useContext } from 'react'

export const useCartContext = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw Error('useCartContext must be used inside a CartContextProvider')
    }

    return context
}