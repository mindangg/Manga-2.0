import { useAuthContext } from './useAuthContext'
import { useNotificationContext } from './useNotificationContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { showNotification } = useNotificationContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')
        
        // show notification logout
        showNotification(`See you again`)

        // dispatch logout action'
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}