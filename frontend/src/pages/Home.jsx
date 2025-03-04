import React, { useEffect, useState } from 'react'

import jjk from '../assets/banner/jjk.jpg'

import Slider from '../components/Slider'
import Carousel from '../components/Carousel'

export default function Home() {
    const [manga1, setManga1] = useState([])
    const [manga2, setManga2] = useState([])
    const selectedIndexes1 = [27, 45, 50, 0, 8, 16, 32, 60]
    const selectedIndexes2 = [35, 3, 23, 29, 9, 56, 58, 49]

    useEffect(() => {
        const fetchManga = async () => {
            const response = await fetch('http://localhost:4000/api/manga')

            const json = await response.json()

            if (response.ok) {
                setManga1(selectedIndexes1.map(index => json[index]))
                setManga2(selectedIndexes2.map(index => json[index]))
            }
        }

        fetchManga()
    }, [])

    return (
        <div className='home'>
            <Slider/>
            <Carousel title='Best Sellers' manga={manga1}/> 

            <div className='banner'>
                <img src={jjk}></img>
            </div>

            <Carousel title='People Choices' manga={manga2}/>
        </div>
    )
}
