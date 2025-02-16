import React from 'react'

export default function Pagination({ totalProducts, productPerPages, currentPage, setCurrentPage }) {
    let totalPages = totalProducts / productPerPages

    return (
        <div className='pagination'>
            <button id='pagination--prev' className='pagination__btn' 
                onClick={() => setCurrentPage(prev => prev === 1 ? 1 : prev - 1)}>
                <i className="fa-solid fa-angle-left" id="left__angle"></i>
                <i className="fa-solid fa-arrow-left" id="left__arrow"></i>
            </button>
                <span>{currentPage} / {totalPages}</span>
            <button id='pagination--next' className='pagination__btn'
                onClick={() => setCurrentPage(next => next >= totalPages ? totalPages : next + 1)}>
                <i className="fa-solid fa-angle-right" id="right__angle"></i>
                <i className="fa-solid fa-arrow-right" id="right__arrow"></i>
            </button>
        </div>
    )
}
