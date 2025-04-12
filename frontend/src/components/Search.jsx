import React, { useState } from 'react'

import { useFilter } from '../hooks/useFilter'

import '../styles/Search.css'

export default function Search({ setToggle }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const { handleFilter } = useFilter()

    const handleSearch = () => {
        setToggle('product')
        handleFilter(title, category, minPrice, maxPrice)
        close()
    }
    
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }   

    const close = () => {
        setIsFilterOpen(false)

        setTitle('')
        setCategory('')
        setMinPrice('')
        setMaxPrice('')
    
        document.querySelector('.search').style.animationName = 'leftToRight'
        setTimeout(() => {
            document.querySelector('.search-popup').style.display = 'none';
        }, 390)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            handleSearch()
    }

    return (
        <div className='search-popup'>
            <div className='search'>
                <div className='searchbox'>
                    <input type='search' placeholder='Search for...'
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}></input>
                    <a onClick={() => close()}><i className='fa-solid fa-xmark'></i></a>
                </div>

                <a id='filter' onClick={toggleFilter}><i className='fa-solid fa-filter'></i></a>

                {isFilterOpen && (
                <div className='filter-container' onKeyDown={(e) => handleKeyDown(e)}>
                    <select id='filter-category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>All</option>
                        <option value='shounen'>Shounen</option>
                        <option value='seinen'>Seinen</option>
                        <option value='rom-com'>Rom Com</option>
                        <option value='action'>Action</option>
                        <option value='family'>Family</option>
                        <option value='comedy'>Comedy</option>
                        <option value='fantasy'>Fantasy</option>
                        <option value='dark-fantasy'>Dark Fantasy</option>
                    </select>

                    <span>Price</span>
                    <input type='number' placeholder='Min' value={minPrice}
                            onChange={(e) => setMinPrice(Math.max(0, parseFloat(e.target.value)))}
                            ></input>
                    <span>to</span>
                    <input type='number' placeholder='Max' value={maxPrice}
                            onChange={(e) => setMaxPrice(Math.max(0, parseFloat(e.target.value)))}
                            ></input>
                    <a onClick={handleSearch}>
                        <i className='fa-solid fa-magnifying-glass-dollar'></i>
                    </a>
                </div>
                )}
            </div>
        </div>
    )
}
