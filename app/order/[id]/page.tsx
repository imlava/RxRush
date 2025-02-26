import OrderTracking from '@/components/OrderTracking'
import { RuntimeConfig } from '@/config/runtime-config'
import { orderService } from '@/services/orderService'

// Use dynamic rendering instead of static params
export const dynamic = 'force-dynamic'

async function getOrder(id: string) {
  try {
    const order = await orderService.getById(id)
    return order
  } catch (error) {
    console.error('Error fetching order:', error)
    return null
  }
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <OrderTracking id={params.id} />
    </div>
  )
}
