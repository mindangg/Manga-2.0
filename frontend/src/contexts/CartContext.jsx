import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            return {
                cart: action.payload
            }   
            
        case 'ADD_ITEM':
            return {
                cart: [action.payload, ...state.cart]
            }

        case 'DELETE_ITEM':
            return {
                cart: state.cart.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: []
    })

    return (
        <CartContext.Provider value={{...state, dispatch}}>
            { children }
        </CartContext.Provider>
    )
}