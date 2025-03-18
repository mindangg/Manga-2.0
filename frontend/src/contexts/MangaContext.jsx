import { createContext, useReducer } from 'react'

export const MangaContext = createContext() 

export const mangaReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_ITEM':
            return {
                manga: action.payload
            }
            
        case 'ADD_ITEM':
            return {
                manga: [action.payload, ...state.manga]
            }

        case 'DELETE_ITEM':
            return {
                manga: state.manga.filter((m) => m._id !== action.payload)
            }

        case 'UPDATE_ITEM':
            return {
                manga: state.manga.map((m) => m._id === action.payload._id ? action.payload : m)
            }
        
        default:
            return state
    }
}

export const MangaContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mangaReducer, {
        manga: []
    })

    return (
        <MangaContext.Provider value={{...state, dispatch}}>
            { children }
        </MangaContext.Provider>
    )
}