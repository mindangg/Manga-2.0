import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            return {
                cart: action.payload
            }

        case 'DELETE_ITEM':
            console.log('Delete cart', action.payload.items)
            return {
                cart: state.cart.filter((i) => i._id !== action.payload.items._id)
            }

        case 'UPDATE_QUANTITY':
            console.log('Update quantity', action.payload)
            return {
                cart: state.items.map((i) => 
                        i.mangaID === action.payload.mangaID ? {...i, quantity: action.payload.quantity} : i)
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