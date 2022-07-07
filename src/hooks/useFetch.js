import React, {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [result, setResult] = useState(null)
    const fetchData = () => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            setResult(res)
        })
    }
    useEffect(() => {
        fetchData()
    }, [url])
    return result
}

export default useFetch