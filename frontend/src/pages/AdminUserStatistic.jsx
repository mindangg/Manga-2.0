import React, { useState, useEffect } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { useSearchParams } from 'react-router-dom'

import { useAdminContext } from '../hooks/useAdminContext'

export default function AdminUserStatistic() {
    const { admin } = useAdminContext()

    const [user, setUser] = useState([])
    const [stats, setStats] = useState([])

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    })

    const [searchParams, setSearchParams] = useSearchParams()
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    const fetchStats = async () => {
        try {
            const url = searchParams.toString()
            ? `http://localhost:4000/api/user-statistic?${searchParams}`
            : `http://localhost:4000/api/user-statistic`
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
            if (!response.ok)
                return console.error('Error fetching user statistic:', response.status)
            
            const json = await response.json()
            console.log(json)

            setStats(json)
            const labels = json.monthlyUsers.map(stat => `${stat._id.month}/${stat._id.year}`)
            const usersPerMonth = json.monthlyUsers.map(stat => stat.count)

            setChartData({
                // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                labels,
                datasets: [
                    {
                        label: 'Users Per Month',
                        data: usersPerMonth,
                        backgroundColor: '#e69e19',
                    }
                ]
            })
        }
        catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    const fetchTop5Users = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user-statistic/top5', {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
            if (!response.ok)
                return console.error('Error fetching top 5 users:', response.status)
            
            const json = await response.json()
            console.log(json)

            setUser(json)
        }
        catch (error) {
            console.error('Error fetching top 5 users:', error)
        }
    }

    useEffect(() => {
        fetchStats()
        fetchTop5Users()
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
        <div className='user-statistic-container'>
            <div className='user-statistic-controller'>
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

                <div className='user-statistic-icon'>
                    <button onClick={handleRefresh}><i className='fa-solid fa-rotate-right'></i>Refresh</button>
                </div>
            </div>

            <div className='user-statistic-items'>
                <div className='user-statistic-item'>
                    <div className='user-statistic-item-content'>
                        <p>Total User</p>
                        <h4>{stats && stats.totalUsers}</h4>
                    </div>
                    <div className='user-statistic-item-icon'>
                        <i className='fa-solid fa-book'></i>
                    </div>
                </div>
                <div className='user-statistic-item'>
                    <div className='user-statistic-item-content'>
                        <p>Total Revenue</p>
                        {/* <h4>$ {stats && stats.reduce((total, i) => total + i.monthlyUsers || 0, 0).toFixed(2)}</h4> */}
                        <h4>$ </h4>
                    </div>
                    <div className='user-statistic-item-icon'>
                        <i class='fa-solid fa-file-lines'></i>
                    </div>
                </div>
                <div className='user-statistic-item'>
                    <div className='user-statistic-item-content'>
                        <p>Total Profit</p>
                        <h4>$ </h4>
                    </div>
                    <div className='user-statistic-item-icon'>
                        <i className='fa-solid fa-dollar-sign'></i>
                    </div>
                </div>
            </div>

            <div className='user-statistic-chart'>
                {chartData 
                ? (
                    <Bar data={chartData} />
                )
                : (
                    <p className='loading-message'>Loading chart data...</p>
                )}
            </div>
            
            <h1 style={{ color: 'white', textAlign: 'center', margin: '50px 0' }}>Top 5 Buyers</h1>
            <div className='user-statistic-header'>
                <span>Username</span>
                <span>Email</span>
                <span>Phone Number</span>
                <span>Address</span>
                <span>Date Created</span>
                <span>Status</span>
            </div>

            {user && user.map((u) => (
                <div className='user-statistic-info'>
                    <span>{u.username}</span>
                    <span>{u.email}</span>
                    <span>{u.phone}</span>
                    <span>{u.address}</span>
                    <span>{formatDate(u.createdAt)}</span>
                    <span className={`user-status-${u.status}`}>{u.status}</span>
                </div>
            ))}
        </div>
    )
}
