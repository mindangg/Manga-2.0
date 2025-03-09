import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            console.log('Deleted: ', action.payload)
            return {
                cart: action.payload
            }
            
        case 'UPDATE_ITEM':
            return {
                
            }
            
        case 'ADD_ITEM':
            return {
                cart: [action.payload, ...state.cart]
            }

        case 'DELETE_ITEM':
            return {
                cart: state.cart.filter((c) => c._id !== action.payload._id)
            }

        case 'UPDATE_ITEM':
            return {
                cart: state.cart.map((c) => c._id === action.payload._id ? action.payload : c)
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