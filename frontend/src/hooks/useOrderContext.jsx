import { OrderContext } from '../contexts/OrderContext'
import { useContext } from 'react'

export const useOrderContext = () => {
    const context = useContext(OrderContext)

    if (!context)
        throw new Error('useOrderContext must be used inside an OrderContextProvider')

    return context
}