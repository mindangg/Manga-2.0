import React, { useState } from 'react'

import '../styles/Search.css'

export default function Search() {

    const showFilter = () => {
        if (document.getElementById("filter").className == "") {
            document.getElementById("filter").classList.add("filter-active")
            document.querySelector(".filter-container").style.display = "inline"
        }
    
        else {
            document.getElementById("filter").classList.remove("filter-active")
            document.querySelector(".filter-container").style.display = "none"
            document.getElementById("filter-min").value = ""
            document.getElementById("filter-max").value = ""
        }
    }

    const close = () => {
        if (document.getElementById('filter').className == 'filter-active') {
            document.getElementById('filter').classList.remove('filter-active')
            document.querySelector('.filter-container').style.display = 'none'
            document.getElementById('filter-min').value = ''
            document.getElementById('filter-max').value = ''
        }
    
        document.querySelector('.search').style.animationName = 'leftToRight'
        setTimeout(function () {
            document.querySelector('.search-popup').style.display = 'none';
        }, 390);
    }

    return (
        <div className='search-popup'>
            <div className='search'>
                <div className='searchbox'>
                    <input id='search-input' type='search' placeholder='Search for...'></input>
                    <a id='search-close' onClick={() => close()}><i className='fa-solid fa-xmark' ></i></a>
                </div>

                <a id='filter' onClick={() => showFilter()}><i className='fa-solid fa-filter' ></i></a>

                <div className='filter-container'>
                    <select id='filter-category'>
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
                    <input type='text' placeholder='Min' id='filter-min'></input>
                    <span >to</span>
                    <input type='text' placeholder='Max' id='filter-max'></input>
                    <a><i className='fa-solid fa-magnifying-glass-dollar'></i></a>
                </div>
            </div>
        </div>
    )
}
