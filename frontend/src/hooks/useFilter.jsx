import { useNavigate, useSearchParams } from 'react-router-dom'

export const useFilter = () => {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const handleFilter = (title, category, minPrice, maxPrice) => {
        const newParams = new URLSearchParams(searchParams)
        console.log(category)
        if (title.trim() !== '') {
            newParams.set('title', title.trim())
        } 
        else
            newParams.delete('title')

        if (category !== '') {
            newParams.set('category', category)
        } 
        else
            newParams.delete('category')

        if (minPrice !== '' && !isNaN(minPrice))
            newParams.set('minPrice', minPrice)
        else
            newParams.delete('minPrice')

        if (maxPrice !== '' && !isNaN(maxPrice))
            newParams.set('maxPrice', maxPrice)
        else
            newParams.delete('maxPrice')

        setSearchParams(newParams)
        navigate(`/product?${newParams}`)
    }

    return { handleFilter, searchParams }
}