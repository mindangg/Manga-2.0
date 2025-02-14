import React, { useState } from 'react'

import '../styles/Search.css'

export default function Search() {


    
    const close = () => {
        if (document.getElementById('filter').className == 'filter__active') {
            document.getElementById('filter').classList.remove('filter__active')
            document.querySelector('.filter__container').style.display = 'none'
            document.getElementById('filter__min').value = ''
            document.getElementById('filter__max').value = ''
        }
    
        document.querySelector('.search').style.animationName = 'leftToRight'
        setTimeout(function () {
            document.querySelector('.search__popup').style.display = 'none';
        }, 390);
    }

    return (
        <div className='search__popup'>
            <div className='search'>
                <div className='searchbox'>
                    <input id='search__input' type='search' placeholder='Search for...'></input>
                    <a id='search__close' onClick={() => close()}><i className='fa-solid fa-xmark' ></i></a>
                </div>

                <a id='filter'><i className='fa-solid fa-filter' ></i></a>

                <div className='filter__container'>
                    <select id='filter__category'>
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

                    <span >Price</span>
                    <input type='text' placeholder='Min' id='filter__min'></input>
                    <span >to</span>
                    <input type='text' placeholder='Max' id='filter__max'></input>
                    <a><i className='fa-solid fa-magnifying-glass-dollar'></i></a>
                </div>
            </div>
        </div>
    )
}
