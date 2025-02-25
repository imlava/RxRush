import MedicineDetail from '@/components/MedicineDetail'
import { RuntimeConfig } from '@/config/runtime-config'

export async function generateStaticParams() {
  try {
    // Use mock data from medicineService instead of API call during build
    const medicines = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' }
    ]

    return medicines.map((medicine) => ({
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
