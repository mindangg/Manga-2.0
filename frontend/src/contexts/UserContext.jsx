import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER': 
            return { 
                users: action.payload 
            }

        case 'ADD_USER':
            return {
                users: [action.payload, ...state.users]
            }

        case 'DELETE_USER':
            return { 
                users: state.users.filter((u) => u._id !== action.payload)
            }

        case 'UPDATE_USER':
            return { 
                users: state.users.map((u) => u._id === action.payload._id ? action.payload : u)
            }
            
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        users: [],
    })

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
