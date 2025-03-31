import React from 'react'

export default function AdminStockStatistic() {
    return (
        <div className='stock-statistic-container'>
            <div className = 'stock-statistic-controller'>
                <select>
                    <option value='All'>All</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Pending'>Pending</option>
                    <option value='Canceled'>Canceled</option>
                </select>

                <div className='stock-statistic-search'>
                    <input type='text' placeholder='Search for...'></input> 
                    <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                
                <label>From</label>

                <input 
                    type='date' 
                    // value={startDate || ''}
                    // onChange={(e) => handleFilterChange(status, e.target.value, endDate)} 
                />

                <label>To</label>

                <input 
                    type='date' 
                    // value={endDate || ''} 
                    // onChange={(e) => handleFilterChange(status, startDate, e.target.value)} 
                />

                <div className='user-icon'>
                    <button><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    {/* <button onClick={toggleAdd}><i className='fa-solid fa-plus'></i>Add</button> */}
                </div>
            </div>
            {/* <div className='stock-statistic-header'>
                <span>stock-statistic</span>
                <span>Customer</span>
                <span>stock-statistic Date</span>
                <span>Total</span>
                <span>Status</span>
                <span>Details</span>
            </div>

            {currentstock-statistic && currentstock-statistic.map((o) => (
                <stock-statisticCard key={o._id} stock-statistic={o}/>
            ))}
            <Pagination
                totalProducts={stock-statistic?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/> */}
        </div>
    )
}
