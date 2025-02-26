import MedicineDetail from '@/components/MedicineDetail'
import { RuntimeConfig } from '@/config/runtime-config'
import { medicineService } from '@/services/medicineService'

// Instead of using generateStaticParams, use dynamic rendering
export const dynamic = 'force-dynamic'

async function getMedicine(id: string) {
  try {
    const medicine = await medicineService.getById(id)
    return medicine
  } catch (error) {
    console.error('Error fetching medicine:', error)
    return null
  }
}

export default async function MedicineDetailPage({ params }: { params: { id: string } }) {
  const medicine = await getMedicine(params.id)
  
  return (
    <main className="container mx-auto px-4 py-8">
      <MedicineDetail id={params.id} />
    </main>
  )
}
