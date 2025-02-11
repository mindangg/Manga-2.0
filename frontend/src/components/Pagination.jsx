import React from 'react'
import '../styles/Pagination.css'

export default function Pagination({ totalPages, perPages }) {
    let pages = []

    for (let i = 1; i < Math.ceil(totalPages / perPages); i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((page, pageIndex) => {
                    return <button key={pageIndex}>{page}</button>
                })
            }
        </div>
    )
}
