import React, { useEffect, useState } from 'react'

import Pagination from '../components/Pagination'
import Display from '../components/Display'

export default function Home() {
    const [manga, setManga] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const [perPages, setPerPages] = useState(8) 

    useEffect(() => {
        const fetchManga = async () => {
            const response = await fetch('http://localhost:4000/api/manga')

            const json = await response.json()

            if (response.ok)
                setManga(json)
        }

        fetchManga()
    }, [])

    const lastPageIndex = currentPage * perPages
    const firstPageIndex = lastPageIndex - perPages
    const currentManga = manga.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='App'>
            <Display currentManga={currentManga}/>
            <Pagination 
                totalPages={manga.length} 
                perPages={perPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
