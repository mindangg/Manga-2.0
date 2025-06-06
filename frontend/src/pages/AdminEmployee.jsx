import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../styles/Admin.css'

import EmployeeCard from '../components/EmployeeCard'
import Pagination from '../components/Pagination'

import { useUserContext } from '../hooks/useUserContext'
import { useAdminContext } from '../hooks/useAdminContext'

import Confirm from '../components/Confirm'

export default function AdminEmployee() {
    const { users, dispatch } = useUserContext()
    const { admin } = useAdminContext()
    
    const [searchParams, setSearchParams] = useSearchParams()

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const [isToggle, setIsToggle] = useState(false)
    const [isToggleRole, setIsToggleRole] = useState(false)
    const [isToggleManage, setIsToggleManage] = useState(false)

    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setProductPerPages] = useState(8) 

    const [allRoles, setAllRoles] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)

    const toggle = () => {
        setFullname('')
        setEmail('')
        setPhone('')
        setPassword('')
        setRole('')
        setIsToggle(!isToggle)
        setSelectedEmployee(null)
    }

    const toggleRole = () => {
        setRoleName('')
        setPermissions([])
        setIsToggleRole(!isToggleRole)
        setSelectedRole(null)
    }

    const fetchEmployee = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/employee?${searchParams}`
            : `http://localhost:4000/api/employee`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching employee:', response.status)
            
            const json = await response.json()

            dispatch({type: 'SET_USER', payload: json})
        }
        catch (error) {
            console.error('Error fetching employee:', error)
        }
    }

    const fetchRole = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/role', {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching role:', response.status)
            
            const json = await response.json()

            setAllRoles(json)
        }
        catch (error) {
            console.error('Error fetching role:', error)
        }
    }

    useEffect(() => {
        fetchEmployee()
        fetchRole()
    }, [dispatch, searchParams])

    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)

    const handleEdit = (employee) => {
        setSelectedEmployee(employee)
        setFullname(employee.fullname)
        setEmail(employee.email)
        setPhone(employee.phone)
        if (employee.role)
            setRole(employee.role._id)
        setIsToggle(true)
    }

    const handleEditRole = (role) => {
        setSelectedRole(role)
        setRoleName(role.name)
        setPermissions(role.permissions)
        setIsToggleRole(true)
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
                body: JSON.stringify({ fullname, email, phone, role })
            })

            if (!response.ok)
                throw new Error('Failed to update employee')

            fetchEmployee()

            setIsToggle(false)
            setFullname('')
            setEmail('')
            setPhone('')
            setRole('')
            setSelectedEmployee(null)
        } 
        catch (error) {
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
                body: JSON.stringify({ fullname, email, phone, password, role })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            fetchEmployee()

            setIsToggle(false)
            setFullname('')
            setEmail('')
            setPhone('')
            setRole('')
            setSelectedEmployee(null)
        }
        catch (error) {
            console.error(error)
        }
    }
    
    const handleRefresh = () => {
        setFilter('')
        setSearchParams({})
    }
        
    useEffect(() => {
        handleRefresh()
    }, [])

    const [filter, setFilter] = useState('')
    
    const handleFilter = (fullname, role) => {
        const newParams = new URLSearchParams(searchParams)

        if (fullname.trim() !== '') {
            newParams.set('fullname', fullname.trim())
        } 
        else
            newParams.delete('fullname')

        if (role !== '') {
            newParams.set('role', role)
        } 
        else
            newParams.delete('role')

        setSearchParams(newParams)
    }
      
    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentEmployee = users?.slice(firstPageIndex, lastPageIndex)

    const [roleName, setRoleName] = useState('')
    const [permissions, setPermissions] = useState([])

    const functions = [
        'Product',
        'Supplier',
        'User',
        'Order',
        'Employee',
        'User Statistic',
        'Order Statistic',
        'Stock Statistic'
    ]
    
    const actions = ['Create', 'Read', 'Update', 'Delete']    

    const handleCheckboxChange = (func, action) => {
        setPermissions(prev => {
            const existing = prev.find(p => p.function === func)
            
            if (existing) {
                const hasAction = existing.actions.includes(action)
                let updatedActions
    
                if (hasAction)
                    updatedActions = existing.actions.filter(a => a !== action)
                 
                else {
                    updatedActions = [...existing.actions, action]
   
                    if (['Create', 'Delete', 'Update'].includes(action) && !updatedActions.includes('Read'))
                        updatedActions.push('Read')
                }
    
                if (updatedActions.length === 0)
                    return prev.filter(p => p.function !== func)
                
                else {
                    return prev.map(p =>
                        p.function === func ? { ...p, actions: updatedActions } : p
                    )
                }
            } 
            else {
                let newActions = [action]
                if (['Create', 'Delete', 'Update'].includes(action))
                    newActions.push('Read')

                return [...prev, { function: func, actions: newActions }]
            }
        })
    }
    
    const handleSaveRole = async (e) => {
        e.preventDefault()

        if (!selectedRole)
            return

        console.log(selectedRole._id)
        console.log(roleName)
        console.log(permissions)
    
        try {
            const response = await fetch(`http://localhost:4000/api/role/${selectedRole._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ name: roleName, permissions })
            })

            if (!response.ok)
                throw new Error('Failed to update role')
    
            fetchRole()

            setIsToggleRole(false)
            setRoleName('')
            setPermissions([])
            setSelectedRole(null)
        } 
        catch (error) {
            console.error('Error updating role:', error)
        }
    }

    const handleUploadRole = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/api/role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ name: roleName, permissions })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            fetchRole()

            setIsToggleRole(false)
            setRoleName('')
            setPermissions([])
            setSelectedRole(null)
        }
        catch (error) {
            console.error(error)
        }
    }

    const hasPermission = (admin, functionName, action) => {
        if (admin && admin.employee.role.permissions) {
            return admin.employee.role.permissions.some(permission => 
                permission.function === functionName &&
                permission.actions.includes(action)
            )
        }
    }   
    
    const handleDeleteRole = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/api/role/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
    
            if (!response.ok) {
                console.error('Failed to delete role')
                return
            }
            fetchRole()
            fetchEmployee()
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='employee-container'>
            <div className = 'employee-controller'>
                <select onChange={(e) => handleFilter('', e.target.value)}>
                    <option value=''>All</option>
                    {/* {admin.employee.role.name == 'Manager' && <option value='Manager'>Manager</option>} */}
                    {allRoles && allRoles.map((roleItem) => (
                        <option key={roleItem._id} value={roleItem._id}>
                            {roleItem.name}
                        </option>
                    ))}
                </select>

                <div className='employee-search'>
                    <input
                    type='text'
                    placeholder='Search for...'
                    value={filter}
                    onChange={(e) => {
                        handleFilter(e.target.value, '')
                        setFilter(e.target.value)}}/>
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>

                <div className='employee-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    {hasPermission(admin, 'Employee', 'Create') && (
                        <button onClick={toggle}><i className='fa-solid fa-plus'></i>Add Employee</button>
                    )}
                    {hasPermission(admin, 'Employee', 'Create') && (
                        <button onClick={toggleRole}><i className='fa-solid fa-plus'></i>Add Role</button>
                    )}
                    <button onClick={() => setIsToggleManage(!isToggleManage)}><i className='fa-solid fa-bars-progress'></i>Manage Role</button>
                </div>
            </div>
            <div className='employee-header'>
                <span>Fullname</span>
                <span>Email</span>
                <span>Phone Number</span>
                <span>Date Created</span>
                <span>Role</span>
                <span>Edit</span>
            </div>

            {currentEmployee && currentEmployee.map((e) => (
                <EmployeeCard key={e._id} employee={e} handleEdit={handleEdit} hasPermission={hasPermission}/>
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

                            <label>Email</label>
                            <input type='text' placeholder='Email' value={email} 
                                        onChange={(e) => setEmail(e.target.value)}/>
        
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
                                <option value=''>Role</option>
                            {allRoles && allRoles.map((r) => (
                                <option key={r._id} value={r._id}>
                                    {r.name}
                                </option>
                            ))}
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

            {isToggleRole && (
                <div className='add-role-container'>
                    <div className='add-role'>
                        <i className='fa-solid fa-xmark' onClick={toggleRole}></i>
                        {selectedRole ? (
                            <h2>Edit role</h2>
                        ) : (
                            <h2>Add new role</h2>
                        )}
                        <form onSubmit={selectedRole ? handleSaveRole : handleUploadRole}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center'}}>
                                <label>Name</label>
                                <input style={{ width: '30%'}}
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}></input>
                            </div>
                            <div className='add-role-header'>
                                <span>Function</span>
                                {actions.map(action => <span key={action}>{action}</span>)}
                            </div>

                            {functions.map(func => (
                                <div key={func} className='add-role-items'>
                                    <span>{func}</span>
                                    {actions.map(action => (
                                        <input
                                            key={action}
                                            type='checkbox'
                                            checked={permissions.find(p => p.function === func)?.actions.includes(action) || false}
                                            onChange={() => handleCheckboxChange(func, action)}
                                        />
                                    ))}
                                </div>
                            ))}
        
                            <div style={{ textAlign: 'center' }}>
                                {selectedRole ? (
                                    <button type='submit'>Save</button>
                                ) : (
                                    <button type='submit'>+ Add</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isToggleManage && (
                <div className='manage-role-container'>
                    <div className='manage-role'>
                        <i className='fa-solid fa-xmark' id='manage-role-close' onClick={() => setIsToggleManage(!isToggleManage)}></i>
                        <h2>All Role</h2>
                        <div className='manage-role-header'>
                            <span>Role</span>
                            <span>Action</span>
                        </div>
                        {allRoles?.map(r => (
                            <div key={r._id} className='manage-role-items'>
                                <span>{r.name}</span>
                                <span className='manage-role-action'>
                                    {hasPermission(admin, 'Employee', 'Update') && (
                                        <i className='fa-solid fa-pen-to-square' onClick={() => handleEditRole(r)}></i>
                                    )}
                                    {hasPermission(admin, 'Employee', 'Delete') && (
                                        <i className='fa-solid fa-trash-can' onClick={() => setShowConfirm(r._id)}></i>
                                    )}
                                </span>

                                {showConfirm === r._id && (
                                    <Confirm
                                        message='Are you sure you want to delete this role?'
                                        onConfirm={() => handleDeleteRole(r._id)}
                                        onCancel={() => setShowConfirm(null)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
