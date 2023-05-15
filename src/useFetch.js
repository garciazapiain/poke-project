import React, { useEffect, useState } from 'react'

export const useFetch = (url) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url)
          const dataFromResponse = await res.json()
          setData(dataFromResponse)
          if (res.status !== 200) {
            setError(true)
          }
          setLoading(false)
        } catch {
          setLoading(false)
          setError(true)
        }
      }
      fetchData()
    }, [url])
    return [data, error, loading]
  }