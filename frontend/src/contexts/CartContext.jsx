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
                cart: {
                    ...state.cart,
                    items: [...state.cart.items, action.payload]
                }
            }

        case 'DELETE_ITEM':
            console.log('State', state.cart)
            console.log('Delete', action.payload)
            return {
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter((i) => i._id !== action.payload)
                }
            }

        case 'UPDATE_QUANTITY':
            console.log('cart state', state.cart.items[0].mangaID._id)
            console.log('action', action.payload.quantity)
            return {
                cart: {
                    ...state.cart,
                    items: state.cart.items.map((i) =>
                        i.mangaID._id.toString() === action.payload.mangaID.toString()
                            ? { ...i, quantity: action.payload.quantity }
                            : i
                    )
                }
            }
            
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: { items: [] }
    })

    return (
        <CartContext.Provider value={{...state, dispatch}}>
            { children }
        </CartContext.Provider>
    )
}