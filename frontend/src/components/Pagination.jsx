import React from 'react'
import '../styles/Pagination.css'

export default function Pagination({ totalPages, perPages, currentPage, setCurrentPage }) {
    let pages = []

    // for (let i = 1; i <= Math.ceil(totalPages / perPages); i++) {
    //     pages.push(i)
    // }

    // const total = pages

    return (
        <div className='pagination'>
            <button id='pagination--prev' className='pagination__btn' 
                onClick={() => setCurrentPage(prev => prev === 1 ? 1 : prev - 1)}>
                <i className="fa-solid fa-angle-left" id="left__angle"></i>
                <i className="fa-solid fa-arrow-left" id="left__arrow"></i>
            </button>
                <span>{currentPage} / {totalPages / 2}</span>
            <button id='pagination--next' className='pagination__btn'
                onClick={() => setCurrentPage(next => next >= 2 ? 2 : next + 1)}>
                <i className="fa-solid fa-angle-right" id="right__angle"></i>
                <i className="fa-solid fa-arrow-right" id="right__arrow"></i>
            </button>
        </div>
    )
}
