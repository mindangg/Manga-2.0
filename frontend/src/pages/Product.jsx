import React, { useEffect, useState } from 'react'

import Pagination from '../components/Pagination'
import Display from '../components/Display'

import { useFilter } from '../hooks/useFilter'

export default function Product() {
    const [manga, setManga] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setproductPerPages] = useState(8) 

    const { searchParams } = useFilter()

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const url = searchParams.toString()
                ? `http://localhost:4000/api/manga?${searchParams}`
                : `http://localhost:4000/api/manga`

                const response = await fetch(url)

                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`)
                
                const json = await response.json()

                setManga(json)
            } 
            catch (error) {
                console.error('Error fetching manga:', error)
            }
        }

        fetchManga()
    }, [searchParams])

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentManga = manga.slice(firstPageIndex, lastPageIndex)

    return (
        <div>
            <Display currentManga={currentManga}/>
            <Pagination 
                totalProducts={manga.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
