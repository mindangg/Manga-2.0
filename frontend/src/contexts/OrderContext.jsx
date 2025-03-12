import { createContext, useReducer } from 'react'

export const OrderContext = createContext()

export const orderReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            return {
                order: action.payload
            }
            
        case 'ADD_ITEM':
            return {
                order: [action.payload, ...state.order]
            }

        case 'DELETE_ITEM':
            return {
                order: state.order.filter((c) => c._id !== action.payload)
            }

        case 'UPDATE_ITEM':
            return {
                order: state.order.map((c) => c._id === action.payload._id ? action.payload : c)
            }
            
        default:
            return state
    }
}

export const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, {
        order: []
    })

    return (
        <OrderContext.Provider value={{...state, dispatch}}>
            { children }
        </OrderContext.Provider>
    )
}