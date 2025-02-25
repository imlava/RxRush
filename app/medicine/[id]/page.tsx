import MedicineDetail from '@/components/MedicineDetail'
import { RuntimeConfig } from '@/config/runtime-config'

export async function generateStaticParams() {
  try {
    const response = await fetch(`${RuntimeConfig.apiBaseUrl}/api/medicines`)
    if (!response.ok) {
      throw new Error('Failed to fetch medicines')
    }
    const medicines = await response.json()

    return medicines.map((medicine: { id: string }) => ({
      id: medicine.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <MedicineDetail id={params.id} />
    </main>
  )
}
