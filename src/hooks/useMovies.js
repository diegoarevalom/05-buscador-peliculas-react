import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search, sort}) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState([])
    const [error, setError] = useState([])
    const previousSearch  = useRef(search) // es algo que persiste aunque se renderice

    const getMovies = useCallback(async({search}) => {
      if(search === previousSearch.current) return
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
      } catch(e) {
        setError(e.messsage)
      } finally {
        // tanto en el try como en el catch
        setLoading(false)
      }
    
  }, [])


    const sortedMovies = useMemo(() => {
      
      console.log('memoSortedMovies')
      return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [sort, movies])

    return {movies: sortedMovies,  getMovies, loading}
  }
  