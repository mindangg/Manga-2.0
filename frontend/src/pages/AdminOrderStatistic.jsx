import React, { useState, useEffect } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminOrderStatistic() {
    const { admin } = useAdminContext()

    const [stats, setStats] = useState([])
    const [statsByMonths, setStatsByMonths] = useState([])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    })
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('All')

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/order-statistic', {
                    headers: {
                        'Authorization': `Bearer ${admin.token}`
                    }
                })
                if (!response.ok)
                    return console.error('Error fetching order statistic:', response.status)
                
                const json = await response.json()
                // console.log(json)
    
                setStats(json)
            }
            catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [])

    useEffect(() => {
        const fetchStatsByMonths = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/order-statistic/months', {
                    headers: {
                        'Authorization': `Bearer ${admin.token}`
                    }
                })
                if (!response.ok)
                    return console.error('Error fetching order statistic:', response.status)
                
                const json = await response.json()
    
                setStatsByMonths(json)

                const salesData = json.map((stat) => stat.totalSales)
                const revenueData = json.map((stat) => stat.totalRevenue)
                const profitData = json.map((stat) => stat.totalProfit)
    
                setChartData({
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    datasets: [
                        {
                            label: 'Total Sales',
                            data: salesData,
                            backgroundColor: '#e69e19',
                        },
                        {
                            label: 'Total Revenue ($)',
                            data: revenueData,
                            backgroundColor: '#28ac64',
                        },
                        {
                            label: 'Total Profit ($)',
                            data: profitData,
                            backgroundColor: '#f84c2c',
                        }
                    ]
                })
            }
            catch (error) {
                console.error('Error fetching stats:', error)
            }
        }
    
        fetchStatsByMonths()
    }, [])
 
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
                </div>
            </div>

            <div className='order-statistic-items'>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Quantity Sold</p>
                        <h4>{stats && stats.totalSales}</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i className='fa-solid fa-book'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Revenue</p>
                        <h4>$ {stats && stats.totalRevenue}</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i class='fa-solid fa-file-lines'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Profit</p>
                        <h4>$ {stats && stats.totalProfit}</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i className='fa-solid fa-dollar-sign'></i>
                    </div>
                </div>
            </div>

            <div className='order-statistic-chart'>
                {chartData 
                ? (
                    <Bar data={chartData} />
                )
                : (
                    <p className='loading-message'>Loading chart data...</p>
                )}

                    {/* data={{
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        datasets: [
                            {
                                label: 'Total Sales',
                                data: [10,20,30],
                                backgroundColor: '#e69e19'
                            },
                            {
                                label: 'Total Revenue ($)',
                                data: [300,200,400],
                                backgroundColor: '#28ac64',
                            },
                            {
                                label: 'Total Profit ($)',
                                data: [100,120,150],
                                backgroundColor: '#f84c2c',
                            }
                        ]
                    }} */}

            </div>
        </div>
    )
}
