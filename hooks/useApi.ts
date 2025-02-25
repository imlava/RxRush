// hooks/useApi.ts
import { useState, useEffect } from 'react'
import { RuntimeConfig } from '../config/runtime-config'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export function useApi<T>(endpoint: string, options: ApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Handle both absolute and relative URLs
        const url = endpoint.startsWith('http') 
          ? endpoint 
          : `${RuntimeConfig.apiBaseUrl}${endpoint}`

        const response = await fetch(url, {
          method: options.method ?? 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
          credentials: 'include' // Include cookies in requests
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, options.method, options.body, JSON.stringify(options.headers)])

  return { data, error, loading }
}
