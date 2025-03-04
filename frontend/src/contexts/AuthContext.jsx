import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { 
                user: action.payload 
            }

        case 'LOGOUT':
            return { 
                user: null 
            }

        // Admin-specific actions
        // case 'SET_USERS': 
        //     return { 
        //         ...state,
        //         users: action.payload
        //     }

        // case 'ADD_USER':
        //     return {
        //         ...state,
        //         users: [action.payload, ...state.users]
        //     }

        // case 'DELETE_USER':
        //     return { 
        //         ...state,
        //         users: state.users.filter((u) => u._id !== action.payload._id)
        //     }

        // case 'UPDATE_USER':
        //     return { 
        //         ...state,
        //         users: state.users.map((u) => u._id === action.payload._id ? action.payload : u)
        //     }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user)
            dispatch({ type: 'LOGIN', payload: user })
        
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
