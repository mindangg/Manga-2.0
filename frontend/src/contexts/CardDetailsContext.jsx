import React, { createContext, useState } from 'react'

export const CardDetailsContext = createContext({
    manga: null,
    showProductInfo: () => {},
    clearManga: () => {}
})

export const CardDetailsContextProvider = ({ children }) => {
    const [manga, setManga] = useState(null)

    const showProductInfo = async (id) => {
        const response = await fetch('http://localhost:4000/api/manga/' + id)

        if (!response.ok) {
            setManga(null)
            throw new Error('Failed to fetch manga details')
        }

        if (response.ok) {
            const mangaData = await response.json()
            setManga(mangaData)
        }
        
    }

    const clearManga = () => {
        setManga(null)
    }

    return (
        <CardDetailsContext.Provider value={{ manga, showProductInfo, clearManga }}>
            { children }
        </CardDetailsContext.Provider>
    )
}