import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            return {
                cart: action.payload
            }

        // case 'ADD_ITEM':
        //     return {
            // cart: {
            //     ...state.cart,
            //     items: [...state.cart.items, action.payload]
            // }
        //     }

        case 'DELETE_ITEM':
            console.log('State', state.cart)
            console.log('Delete', action.payload)
            return {
                cart: state.cart.items.filter((i) => i._id !== action.payload)
            }

            case 'UPDATE_QUANTITY':
                return {
                    cart: state.cart.map((item) =>
                        item.mangaID === action.payload.mangaID
                            ? { ...item, quantity: action.payload.quantity }
                            : item
                    )
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