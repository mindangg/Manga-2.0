import React, { useState }  from 'react'

import '../styles/Admin.css'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'
import { useNotificationContext } from '../hooks/useNotificationContext'

import Confirm from './Confirm'

export default function EmployeeCard({ employee, handleEdit, hasPermission }) {
    const { dispatch } = useUserContext()
    const { admin } = useAdminContext()
    const { showNotification } = useNotificationContext()
    const [showConfirm, setShowConfirm] = useState(false)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const handleDelete = async () => {
        if (employee._id === admin.employee._id) {
            showNotification('Cant delete employee because it is in used')
            return
        }

        try {
            const response = await fetch('http://localhost:4000/api/employee/' + employee._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
    
            if (!response.ok) {
                console.error('Failed to delete employee')
                return
            }
            dispatch({type: 'DELETE_USER', payload: employee._id})
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='employee-info'>
            <span>{employee.fullname}</span>
            <span>{employee.email}</span>
            <span>{employee.phone}</span>
            <span>{formatDate(employee.createdAt)}</span>
            <span className={`employee-role-${employee.role?.name || ''}`}>{employee.role?.name ?? ''}</span>
            <span className='employee-action'>
            {hasPermission(admin, 'Employee', 'Update') && (
                <i className='fa-solid fa-pen-to-square' onClick={() => handleEdit(employee)}></i>
            )}
            {hasPermission(admin, 'Employee', 'Delete') && (
                <i className='fa-solid fa-trash-can' onClick={() => setShowConfirm(true)}></i>
            )}
            </span>
            {showConfirm && (
                <Confirm
                    message='Are you sure you want to delete this employee?'
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
