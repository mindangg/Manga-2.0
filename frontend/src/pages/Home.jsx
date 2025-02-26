import React, { useEffect, useState } from 'react'

import jjk from '../assets/banner/jjk.jpg'

import Slider from '../components/Slider'
import Carousel from '../components/Carousel'

export default function Home() {
    const [manga, setManga] = useState([])

    useEffect(() => {
        const fetchManga = async () => {
            const response = await fetch('http://localhost:4000/api/manga')

            const json = await response.json()

            if (response.ok)
                setManga(json)
        }

        fetchManga()
    }, [])

    return (
        <div className='home'>
            <Slider/>
            <Carousel title='Best Sellers'/> 

            <div className='banner'>
                <img src={jjk}></img>
            </div>

            <Carousel title='People Choices'/>
        </div>
    )
}
