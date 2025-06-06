import React, { useState } from 'react'

import '../styles/Admin.css'

import { useAdminContext } from '../hooks/useAdminContext'
import { useOrderContext } from '../hooks/useOrderContext'

import Confirm from './Confirm'

import { usePDF } from '../hooks/usePDF'

export default function OrderCard({ order, hasPermission, fetchOrder }) {
    const { admin } = useAdminContext()
    const { dispatch } = useOrderContext()
    const [isApprove, setIsApprove] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedAction, setSelectedAction] = useState(null)

    const { generatePDF } = usePDF()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const toggleApprove = () => {
        setIsApprove(!isApprove)
    }

    const approveOrder = async (status) => {
        try {
            const response = await fetch('http://localhost:4000/api/order/' + order._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin.token}`
                },
                body: JSON.stringify({ status })
            })
    
            if (!response.ok)
                return console.error('Failed to approve order:', response.status)

            fetchOrder()
            toggleApprove()
            setShowConfirm(false)
            setSelectedAction(null)
        }
        catch (error) {
            console.error('Failed to approve order', error)
        }
    }

    return (
        <div className='order-info'>
            <span>{order.orderNumber}</span>
            <span>{order.userID && order.userID.email}</span>
            <span>{formatDate(order.createdAt)}</span>
            <span>$ {order.totalPrice}</span>
            <span className={`order-status-${order.status}`}>{order.status}</span>
            <span className='order-action'onClick={toggleApprove}>
                <i className='fa-solid fa-eye'></i>
                Details
            </span>

            {isApprove && (
                <div className='order-approve-container'>
                    <div className='order-approve'>
                        <i className='fa-solid fa-xmark' onClick={toggleApprove}></i>
                        <h2 style={{textAlign: 'center'}}>Order: {order && order.orderNumber}</h2>
                        <div>Customer: {order && order.userID.email}</div>
                        <div>Phone number: {order && order.userID.phone}</div>
                        <div>Address: {order && order.userID.address}</div>
                        <h3>Items: </h3>
                        {order && order.items.map((o) => (
                            <div key={o._id}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <img src={`http://localhost:4000/${o.mangaID.cover1}`} alt='Product Image' />
                                    {o.mangaID.title}
                                </div>
                                <div>Quantity: {o.quantity} <span style={{marginLeft: '50px'}}>Order Price: ${o.price}</span></div>
                            </div>
                        ))}
                        <h3>Total: ${order && order.totalPrice}</h3>
                        <h3>Status: {order && order.status}</h3>
                        {
                            order?.status === 'Pending' && (
                                <div style={{margin: '0', display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                {hasPermission(admin, 'Supplier', 'Update') && (
                                    <>
                                        {order && (
                                            <button
                                                onClick={() => {
                                                    setSelectedAction('Delivered');
                                                    setShowConfirm(true);
                                                }}
                                                style={{ color: 'black', backgroundColor: '#28ac64' }}
                                            >
                                                Delivered
                                            </button>
                                        )}
                                        {order && (
                                            <button
                                                onClick={() => {
                                                    setSelectedAction('Canceled');
                                                    setShowConfirm(true);
                                                }}
                                                style={{ color: 'black',  backgroundColor: '#f84c2c' }}
                                            >
                                                Canceled
                                            </button>
                                        )}
                                    </>
                                )}
                                    {showConfirm && (
                                        <Confirm
                                            message={`Are you sure you want to mark this order as ${selectedAction}?`}
                                            onConfirm={() => approveOrder(selectedAction)}
                                            onCancel={() => {
                                                setShowConfirm(false)
                                                setSelectedAction(null)
                                            }}
                                        />
                                    )}
                                </div>
                            )
                        }
                        <div style={{textAlign: 'center'}}>
                            <button onClick={() => generatePDF(order, 'order')}
                                    style={{
                                        backgroundColor: "var(--green)",
                                        color: "black",
                                        cursor: "pointer",
                                    }}>Save PDF File</button>
                        </div>
                    </div>
                </div>
            )}
        </div> 
    )
}
