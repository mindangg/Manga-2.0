import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Pagination from '../components/Pagination'
import Display from '../components/Display'
import Slider from '../components/Slider'

export default function Product() {
    const [manga, setManga] = useState([])
    const [currentPage, setCurrentPage] = useState(1) 
    const [productPerPages, setproductPerPages] = useState(8) 

    const { category } = useParams()

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const url = category 
                    ? `http://localhost:4000/api/manga/product/${category}`
                    : `http://localhost:4000/api/manga`

                // console.log(url)

                const response = await fetch(url)
                const json = await response.json()

                if (response.ok)
                    setManga(json)
                else
                    console.error('Failed to fetch:', json)
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }

        fetchManga();
    }, [category])

    const lastPageIndex = currentPage * productPerPages
    const firstPageIndex = lastPageIndex - productPerPages
    const currentManga = manga.slice(firstPageIndex, lastPageIndex)

    return (
        <div className='App'>
            <Slider/>
            <Display currentManga={currentManga}/>
            <Pagination 
                totalProducts={manga.length} 
                productPerPages={productPerPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )
}
