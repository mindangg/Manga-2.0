import { useEffect, useState } from 'react'

import '../styles/Admin.css'

import { useAdminContext } from '../hooks/useAdminContext'
import { useOrderContext } from '../hooks/useOrderContext'

export default function StockInForm({ products, toggle, fetchStock }) {
    const { admin } = useAdminContext()
    const { order, dispatch } = useOrderContext()

    const [search, setSearch] = useState('')
    const [selectedProducts, setSelectedProducts] = useState([])

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelectProduct = (product) => {
        if (!selectedProducts.some(p => p._id === product._id)) {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 0 }])
        }
        setSearch('')
    }  

    const handleQuantityChange = (index, value) => {
        const updatedProducts = [...selectedProducts]
        updatedProducts[index].quantity = value
        setSelectedProducts(updatedProducts)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedStocks = selectedProducts.filter(item => item.quantity > 0)
        handleStockSubmit(updatedStocks)
    }

    const handleStockSubmit = async (stockItems) => {
        if (!stockItems)
            return

        try {
            const response = await fetch('http://localhost:4000/api/stock', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${admin.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeID: admin.employee._id, stockItems })
            })

            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)

            const json = await response.json()

            fetchStock()
            toggle()
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log(order)
    }, [dispatch])

    return (
        <div className='add-stock-container'>
            <div className='add-stock'>
                <i className='fa-solid fa-xmark' onClick={() => { 
                        setSearch('');
                        setSelectedProducts([]);
                        toggle() }}></i>

                <h2>Stock In</h2>

                <input 
                    type='text'
                    placeholder='Search for a product...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                    <ul className='search-results'>
                        {filteredProducts.map((product) => (
                            <li key={product._id} onClick={() => handleSelectProduct(product)}>
                                {product.title}
                            </li>
                        ))}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
                    {selectedProducts.length > 0 ? (
                        selectedProducts.map((product, index) => (
                            <div key={product._id} className='stock-item'>
                                <label>{product.title}</label>
                                <input 
                                    type='number'
                                    min='0'
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products selected</p>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <button type='submit'>Stock In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
