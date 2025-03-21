import React, { useState, useEffect, useRef } from 'react'
import Card from './Card'
import '../styles/Carousel.css'

export default function Carousel({ title, manga }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const carouselListRef = useRef(null)

    const handleNext = () => {
        if (activeIndex < manga.length - 4)
            setActiveIndex((prev) => prev + 1)
    }

    const handlePrev = () => {
        if (activeIndex > 0)
            setActiveIndex((prev) => prev - 1)
    }

    useEffect(() => {
        if (carouselListRef.current) {
            const newOffset = activeIndex * 355
            carouselListRef.current.style.transform = `translateX(-${newOffset}px)`
        }
    }, [activeIndex])

    return (
        <div className='carousel'>
            <h1>{title}</h1>
            <div className='carousel-container'>
                <div className='carousel-list' ref={carouselListRef}>
                    {manga.map((m, index) => (
                        <Card key={index} manga={m} />
                    ))}
                </div>
            </div>

            <div className='carousel-button'>
                <button onClick={handlePrev} disabled={activeIndex === 0}>
                    <i className='fa-solid fa-angle-left' id='left-angle'></i>
                    <i className='fa-solid fa-arrow-left' id='left-arrow'></i>
                </button>

                <button onClick={handleNext} disabled={activeIndex >= manga.length - 4}>
                <i className='fa-solid fa-angle-right' id='right-angle'></i>
                <i className='fa-solid fa-arrow-right' id='right-arrow'></i>
                </button>
            </div>

            <ul className='carousel-dots'>
                {manga.slice(0, manga.length - 3).map((_, index) => (
                    <li key={index} className={index === activeIndex ? 'best-active' : ''}></li>
                ))}
            </ul>
        </div>
    )
}
