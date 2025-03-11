import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(UserContext)

    if (!context)
        throw new Error('useUserContext must be used inside an UserContextProvider')

    return context
}