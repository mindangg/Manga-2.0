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
                ...state.cart,
                cart: {
                    items: [...(state.cart.items || []), action.payload]
                }
            }

        case 'DELETE_ITEM':
            console.log('Delete cart', action.payload)
            return {
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter((i) => i._id !== action.payload._id)
                }
            }

        case 'UPDATE_QUANTITY':
            console.log('Update quantity', action.payload)
            return {
                ...state.cart,
                items: state.cart.items.map((i) => 
                    i.mangaID === action.payload.mangaID ? {...i, quantity: action.payload.quantity} : i)
            }
            
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: { items: []}
    })

    return (
        <CartContext.Provider value={{...state, dispatch}}>
            { children }
        </CartContext.Provider>
    )
}