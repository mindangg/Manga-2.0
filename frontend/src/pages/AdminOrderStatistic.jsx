import React, { useState, useEffect } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { useSearchParams } from 'react-router-dom'

import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminOrderStatistic() {
    const { admin } = useAdminContext()

    const [stats, setStats] = useState([])
    const [statsByMonths, setStatsByMonths] = useState([])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    })

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const url = searchParams.toString()
                ? `http://localhost:4000/api/order-statistic?${searchParams}`
                : `http://localhost:4000/api/order-statistic`
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${admin.token}`
                    }
                })
                if (!response.ok)
                    return console.error('Error fetching order statistic:', response.status)
                
                const json = await response.json()
                console.log(json)
    
                setStats(json)
                const labels = json.map(stat => `${stat._id.month}/${stat._id.year}`)
                const salesData = json.map((stat) => stat.totalSales)
                const revenueData = json.map((stat) => stat.totalRevenue)
                const profitData = json.map((stat) => stat.totalProfit)
    
                setChartData({
                    // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    labels,
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

        fetchStats()
    }, [searchParams])

    const handleRefresh = () => {
        setStartDate('')
        setEndDate('')
        setSearchParams({})
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    
    const handleFilter = (startDate, endDate) => {
        const newParams = new URLSearchParams(searchParams)

        if (startDate !== '' || endDate !== '') {
            if (startDate !== '')
                newParams.set('startDate', startDate)

            if (endDate !== '') 
                newParams.set('endDate', endDate)
        }

        else {
            newParams.delete('startDate')
            newParams.delete('endDate')
        }

        setSearchParams(newParams)
    }
 
    return (
        <div className='order-statistic-container'>
            <div className='order-statistic-controller'>
            <label>From</label>

            <input 
                type='date' 
                value={startDate || ''}
                onChange={(e) => {
                    handleFilter(e.target.value, '');
                    setStartDate(e.target.value)}}/>

            <label>To</label>

            <input 
                type='date' 
                value={endDate || ''} 
                onChange={(e) => {
                    handleFilter('', e.target.value);
                    setEndDate(e.target.value)}}/>

                <div className='order-statistic-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                </div>
            </div>

            <div className='order-statistic-items'>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Quantity Sold</p>
                        <h4>{stats && stats.reduce((total, i) => total + i.totalSales || 0, 0)}</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i className='fa-solid fa-book'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Revenue</p>
                        <h4>$ {stats && stats.reduce((total, i) => total + i.totalRevenue || 0, 0).toFixed(2)}</h4>
                    </div>
                    <div className='order-statistic-item-icon'>
                        <i class='fa-solid fa-file-lines'></i>
                    </div>
                </div>
                <div className='order-statistic-item'>
                    <div className='order-statistic-item-content'>
                        <p>Total Profit</p>
                        <h4>$ {stats && stats.reduce((total, i) => total + i.totalProfit || 0, 0).toFixed(2)}</h4>
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
            </div>
        </div>
    )
}
