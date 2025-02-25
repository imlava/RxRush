// components/OrdersList.tsx
import { useApi } from '@/hooks/useApi'

export default function OrdersList() {
  const { data, loading, error } = useApi<{ orders: { id: string }[] }>('/api/orders?page=1&limit=10')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.orders.map(order => (
        <li key={order.id}>{order.id}</li>
      ))}
    </ul>
  )
}
