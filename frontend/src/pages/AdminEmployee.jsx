import React, { useEffect, useState } from 'react'

import '../styles/Admin.css'

import EmployeeCard from '../components/EmployeeCard'
import Pagination from '../components/Pagination'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminUser() {
    const { users, dispatch } = useUserContext()
    const { admin } = useAdminContext()

    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Admin')

    const [isToggle, setIsToggle] = useState(false)

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const fetchEmployee = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/employee', {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching employee:', response.status)
            
            const json = await response.json()

            dispatch({type: 'SET_USER', payload: json})
            
            return json
        }
        catch (error) {
            console.error('Error fetching employee:', error)
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [dispatch])

    const filterEmployee = async (role) => {
        try {
            const employee = await fetchEmployee()
            let filteredEmployee = employee
    
            if (role !== 'All')
                filteredEmployee = employee.filter((o) => o.role === role)

            dispatch({ type: 'SET_USER', payload: filteredEmployee })
        } 
        catch (error) {
            console.error('Error filtering employee:', error)
        }
    }

    const toggle = () => {
        setIsToggle(!isToggle)
    }

    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const handleEdit = (employee) => {
        setSelectedEmployee(employee)
        setFullname(employee.fullname)
        setPhone(employee.phone)
        setRole(employee.role)
        setIsToggle(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()

        if (!selectedEmployee)
            return
    
        try {
            const response = await fetch(`http://localhost:4000/api/employee/${selectedEmployee._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ fullname, phone, role })
            })

            if (!response.ok)
                throw new Error('Failed to update employee')
    
            const json = await response.json()
            dispatch({ type: 'UPDATE_USER', payload: json })

            setIsToggle(false)
            setFullname('')
            setPassword('')
            setPhone('')
            setRole('Admin')
            setSelectedEmployee(null)
        } catch (error) {
            console.error('Error updating employee:', error)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/api/employee/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ fullname, phone, password, role })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            const json = await response.json()

            dispatch({type: 'ADD_USER', payload: json})

            setIsToggle(false)
        }
        catch (error) {
            console.error(error)
        }
    }
      
    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentEmployee = users?.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='employee-container'>
            <div className = 'employee-controller'>
                <select onChange={(e) => filterEmployee(e.target.value)}>
                    <option value='All'>All</option>
                    <option value='Admin'>Admin</option>
                    <option value='Seller'>Seller</option>
                    <option value='Stocker'>Stocker</option>
                </select>

                <div className='employee-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input type='date'></input>

                <label>To</label>

                <input type='date'></input>

                <div className='employee-icon'>
                    <button><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    <button onClick={toggle}><i className='fa-solid fa-plus'></i>Add</button>
                </div>
            </div>
            <div className='employee-header'>
                <span>Fullname</span>
                <span>Phone Number</span>
                <span>Date Created</span>
                <span>Role</span>
                <span>Edit</span>
            </div>

            {currentEmployee && currentEmployee.map((e) => (
                <EmployeeCard key={e._id} employee={e} handleEdit={handleEdit}/>
            ))}
            <Pagination
                totalProducts={users?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            {isToggle && (
                <div className='add-employee-container'>
                    <div className='add-employee'>
                        <i className='fa-solid fa-xmark' onClick={toggle}></i>
                        {selectedEmployee ? (
                            <h2>Edit employee</h2>
                        ) : (
                            <h2>Add new employee</h2>
                        )}
                        <form onSubmit={selectedEmployee ? handleSave : handleUpload}>
                            <label>Full name</label>
                            <input type='text' placeholder='Full name' value={fullname} 
                                        onChange={(e) => setFullname(e.target.value)}/>
        
                            <label>Phone Number</label>
                            <input type='text' placeholder='Phone Number' value={phone}
                                        onChange={(e) => setPhone(e.target.value)}/>
        
                            {!selectedEmployee && (
                                <>
                                    <label>Password</label>
                                    <input type='text' placeholder='Password' value={password}
                                                onChange={(e) => setPassword(e.target.value)}/>
                                </>
                            )}

                            <label>Role</label><br/>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value='Admin'>Admin</option>
                                <option value='Seller'>Seller</option>
                                <option value='Stocker'>Stocker</option>
                            </select>
        
                            <div style={{ textAlign: 'center' }}>
                                {selectedEmployee ? (
                                    <button type='submit'>Save</button>
                                ) : (
                                    <button type='submit'>+ Add</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
