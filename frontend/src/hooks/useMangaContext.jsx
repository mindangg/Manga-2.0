import { MangaContext } from '../contexts/MangaContext'
import { useContext } from 'react'

export const useMangaContext = () => {
    const context = useContext(MangaContext)

    if (!context)
        throw new Error('useMangaContext must be used inside an MangaContextProvider')

    return context
}