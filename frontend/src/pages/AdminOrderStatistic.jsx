import React from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register()

export default function AdminOrderStatistic() {
    // const [data, setData] = useState([]);
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    // const [status, setStatus] = useState('All');

    // useEffect(() => {
    //     const fetchOrderData = async () => {
    //         try {
    //             const res = await axios.get(`/api/inventory-history?startDate=${startDate}&endDate=${endDate}&status=${status}`);
    //             setData(res.data);
    //         } catch (error) {
    //             console.error('Error fetching order data', error);
    //         }
    //     };
    //     fetchorderData();
    // }, [startDate, endDate, status]);

    // const chartData = {
    //     labels: data.map((item) => item.productName),
    //     datasets: [
    //         {
    //             label: 'Amount',
    //             data: data.map((item) => item.totalQuantity),
    //             backgroundColor: 'rgba(54, 162, 235, 0.6)',
    //         },
    //         {
    //             label: 'Cost ($)',
    //             data: data.map((item) => item.totalCost),
    //             backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //         },
    //     ],
    // };
    return (
        <div className='order-statistic-container'>
            <div className='order-statistic-controller'>
                <select>
                    <option value='Manager'>Manager</option>
                    <option value='Seller'>Seller</option>
                    <option value='Stocker'>Stocker</option>
                </select>

                <div className='order-statistic-search'>
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

                <div className='order-statistic-icon'>
                    <button><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                    {/* <button onClick={toggleAdd}><i className='fa-solid fa-plus'></i>Add</button> */}
                </div>
            </div>
            {/* <div className='order-statistic-header'>
                <span>order-statistic</span>
                <span>Customer</span>
                <span>order-statistic Date</span>
                <span>Total</span>
                <span>Status</span>
                <span>Details</span>
            </div>

            {currentorder-statistic && currentorder-statistic.map((o) => (
                <order-statisticCard key={o._id} order-statistic={o}/>
            ))}
            <Pagination
                totalProducts={order-statistic?.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/> */}

            <div className='order-statistic-items'>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Quantity Sold</p>
                        <h4>3</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i className='fa-solid fa-book'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Revenue</p>
                        <h4>$ 5000</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i class='fa-solid fa-file-lines'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Profit</p>
                        <h4>$ 2000</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i className='fa-solid fa-dollar-sign'></i>
                    </div>
                </div>
            </div>

            <div className='order-statistic-chart'>
                <Bar
                    data={{
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        datasets: [
                            {
                                label: 'Ammount',
                                data: [10,20,30]
                            },
                            {
                                label: 'Revenue',
                                data: [300,200,400]
                            },
                            {
                                label: 'Profit',
                                data: [100,120,150]
                            }
                        ]
                    }}
                    
                />
            </div>
        </div>
    )
}
