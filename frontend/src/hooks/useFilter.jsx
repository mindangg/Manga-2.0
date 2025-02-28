import { useNavigate } from 'react-router-dom'

export const useFilter = () => {
    const navigate = useNavigate()
    const [manga, setManga] = useState([])

    const fetchManga = async () => {
        const response = await fetch('http://localhost:4000/api/manga')

        const json = await response.json()

        return json
    }

    const filterByName = (name) => {
        navigate('/product')
        setManga(fetchManga().filter((p) => p.title === name))
    }

    const filterByPrice = () => {
        navigate('/product')
    }

    const filterByCategory = () => {
        navigate('/product')
    }

    return { filterByName, filterByPrice, filterByCategory }
}