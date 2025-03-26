import React from 'react'

export default function Pagination({ totalProducts, productPerPages, currentPage, setCurrentPage }) {
    let totalPages = Math.ceil(totalProducts / productPerPages)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='pagination'>
            <button id='pagination--prev' className='pagination-btn' 
                disabled={currentPage === 1}
                onClick={() => {
                    setCurrentPage(prev => prev === 1 ? 1 : prev - 1)
                    scrollToTop()
                    }}>
                <i className="fa-solid fa-angle-left" id="left-angle"></i>
                <i className="fa-solid fa-arrow-left" id="left-arrow"></i>
            </button>
                <span>{currentPage} / {totalPages ? totalPages : 1}</span>
            <button id='pagination--next' className='pagination-btn'
                disabled={totalPages === 0}
                onClick={() => {
                    setCurrentPage(next => next >= totalPages ? totalPages : next + 1)
                    scrollToTop()
                    }}>
                <i className="fa-solid fa-angle-right" id="right-angle"></i>
                <i className="fa-solid fa-arrow-right" id="right-arrow"></i>
            </button>
        </div>
    )
}
