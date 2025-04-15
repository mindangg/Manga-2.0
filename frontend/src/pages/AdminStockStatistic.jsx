import React, { useState, useEffect } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { useSearchParams } from 'react-router-dom'

import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminStockStatistic() {
    const { admin } = useAdminContext()

    const [stats, setStats] = useState([])
    const [statsByMonths, setStatsByMonths] = useState([])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    })

    const [searchParams, setSearchParams] = useSearchParams()

    const [option, setOption] = useState('month')
    
    const fetchStats = async (option) => {
        try {
            const baseUrl = 'http://localhost:4000/api'
            const endpoint = option ? `stock-statistic/${option}` : 'order-statistic'
            
            const query = searchParams.toString()
            const url = `${baseUrl}/${endpoint}${query ? `?${query}` : ''}`            

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })

            if (!response.ok)
                return console.error('Error fetching order statistic:', response.status)
            
            const json = await response.json()

            setStats(json)
                let labels = ''
                if (option === 'month')
                    labels = json.map(stat => `${stat._id.month}/${stat._id.year}`)
                else
                    labels = json.map(stat => `${stat._id.year}`)

                const productsData = json.map((stat) => stat.totalProducts)
                const quanityData = json.map((stat) => stat.totalQuantity)
                const costData = json.map((stat) => stat.totalCost)
    
                setChartData({
                    // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    labels,
                    datasets: [
                        {
                            label: 'Total Products',
                            data: productsData,
                            backgroundColor: '#e69e19',
                        },
                        {
                            label: 'Total Quantity',
                            data: quanityData,
                            backgroundColor: '#28ac64',
                        },
                        {
                            label: 'Total Cost ($)',
                            data: costData,
                            backgroundColor: '#f84c2c',
                        }
                    ]
                })
        }
        catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    useEffect(() => {
        fetchStats(option)
    }, [option, searchParams])

    const handleRefresh = () => {
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
        <div className='stock-statistic-container'>
            <div className='stock-statistic-controller'>
                <select value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value='month'>Month</option>
                    <option value='year'>Year</option>
                </select>

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

                <div className='stock-statistic-icon'>
                    <button onClick={() => setOption('month')}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                </div>
            </div>

            <div className='stock-statistic-items'>
                <div className='stock-statistic-item'>
                    <div className='stock-statistic-item-content'>
                        <p>Total Products</p>
                        <h4>{stats && stats.reduce((total, i) => total + i.totalProducts || 0, 0)}</h4>
                    </div>
                    <div className='stock-statistic-item-icon'>
                        <i className='fa-solid fa-book'></i>
                    </div>
                </div>
                <div className='stock-statistic-item'>
                    <div className='stock-statistic-item-content'>
                        <p>Total Quantity</p>
                        <h4>{stats && stats.reduce((total, i) => total + i.totalQuantity || 0, 0)}</h4>
                    </div>
                    <div className='stock-statistic-item-icon'>
                        <i class='fa-solid fa-file-lines'></i>
                    </div>
                </div>
                <div className='stock-statistic-item'>
                    <div className='stock-statistic-item-content'>
                        <p>Total Cost</p>
                        <h4>$ {stats && stats.reduce((total, i) => total + i.totalCost || 0, 0).toFixed(2)}</h4>
                    </div>
                    <div className='stock-statistic-item-icon'>
                        <i className='fa-solid fa-dollar-sign'></i>
                    </div>
                </div>
            </div>

            <div className='stock-statistic-chart'>
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
