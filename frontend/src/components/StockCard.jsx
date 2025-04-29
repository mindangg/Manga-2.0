import React, { useState } from 'react'

import '../styles/Admin.css'

import { usePDF } from '../hooks/usePDF'

export default function StockCard({ stock }) {
    const [isToggle, setIsToggle] = useState(false)

    const { generatePDF } = usePDF()

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const toggle = () => {
      setIsToggle(!isToggle)
    }

    return (
        <div className='stock-info'>
            <span>{stock.stockNumber}</span>
            <span>{stock?.employeeID?.fullname ?? ''}</span>
            <span>{formatDate(stock.createdAt)}</span>
            <span>{stock.items.reduce((total, item) => total + item.stockQuantity || 0, 0)}</span>
            <span>$ {stock.totalPrice}</span>
            <span className='stock-action' onClick={toggle}>
                <i className='fa-solid fa-eye'></i>
                Details
            </span>

            {isToggle && (
                <div className='stock-details-container'>
                    <div className='stock-details'>
                        <i class='fa-solid fa-xmark' onClick={toggle}></i>
                        <h2 style={{textAlign: 'center'}}>Stock In: {stock && stock.stockNumber}</h2>
                        <div>Employee: {stock && stock.employeeID.fullname}</div>
                        <h3>Items: </h3>
                        {stock && stock.items.map((o) => (
                            <div key={o._id}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <img src={`http://localhost:4000/${o.mangaID && o.mangaID.cover1}`} alt='Product Image' />
                                    {o.mangaID && o.mangaID.title}
                                </div>
                                <div>Quantity: {o?.stockQuantity} <span style={{marginLeft: '50px'}}>stock Price: ${o?.mangaID?.priceIn}</span></div>
                            </div>
                        ))}
                        <h3>Total: ${stock && stock.totalPrice}</h3>
                        <div style={{textAlign: 'center'}}>
                            <button onClick={() => generatePDF(stock, 'stock')}
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
