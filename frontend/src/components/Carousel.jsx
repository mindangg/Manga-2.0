import React, { useState, useEffect, useRef } from 'react'
import Card from './Card'
import '../styles/Carousel.css'

export default function Carousel() {
    const [manga, setManga] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const carouselListRef = useRef(null)

    useEffect(() => {
        const fetchManga = async () => {
            const response = await fetch('http://localhost:4000/api/manga')
            const json = await response.json()
            if (response.ok)
                setManga(json.slice(0, 8))
        }
        
        fetchManga()
    }, [])

    const handleNext = () => {
        if (activeIndex < manga.length - 4) {
            setActiveIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1)
        }
    }

    useEffect(() => {
        if (carouselListRef.current) {
            const newOffset = activeIndex * 200
            carouselListRef.current.style.transform = `translateX(-${newOffset}px)`
        }
    }, [activeIndex])

    return (
        <div className='carousel'>
            <h1>Best Sellers</h1>
            <div className='carousel__container'>
                <div className='carousel__list' ref={carouselListRef}>
                    {manga.map((m, index) => (
                        <Card key={index} manga={m} />
                    ))}
                </div>
            </div>

            <div className='carousel__button'>
                <button onClick={handlePrev} disabled={activeIndex === 0}>
                    <i className='fa-solid fa-angle-left' id='left__angle'></i>
                    <i className='fa-solid fa-arrow-left' id='left__arrow'></i>
                </button>

                <button onClick={handleNext} disabled={activeIndex >= manga.length - 4}>
                <i className='fa-solid fa-angle-right' id='right__angle'></i>
                <i className='fa-solid fa-arrow-right' id='right__arrow'></i>
                </button>
            </div>

            <ul className='carousel__dots'>
                {manga.slice(0, manga.length - 3).map((_, index) => (
                    <li key={index} className={index === activeIndex ? 'best__active' : ''}></li>
                ))}
            </ul>
        </div>
    )
}
