import { useEffect, useState } from 'react'

export function useSupabaseQuery(loader, deps = [], initialData = []) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    loader()
      .then((result) => {
        if (active) setData(result ?? initialData)
      })
      .catch((err) => {
        if (active) {
          setError(err)
          setData(initialData)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, deps)

  return { data, loading, error }
}
