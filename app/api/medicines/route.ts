import { NextRequest, NextResponse } from 'next/server'

const medicines = [
  { id: '1', name: 'Paracetamol', dosage: '500mg', price: 50, originalPrice: 60, discount: '17% off', description: 'Pain reliever and fever reducer' },
  { id: '2', name: 'Ibuprofen', dosage: '400mg', price: 80, originalPrice: 100, discount: '20% off', description: 'Nonsteroidal anti-inflammatory drug' },
  { id: '3', name: 'Amoxicillin', dosage: '250mg', price: 120, originalPrice: 150, discount: '20% off', description: 'Antibiotic to treat bacterial infections' },
  { id: '4', name: 'Omeprazole', dosage: '20mg', price: 90, originalPrice: 100, discount: '10% off', description: 'Proton pump inhibitor for acid reflux' },
  { id: '5', name: 'Cetirizine', dosage: '10mg', price: 70, originalPrice: 80, discount: '12.5% off', description: 'Antihistamine for allergy relief' },
  { id: '6', name: 'Aspirin', dosage: '300mg', price: 40, originalPrice: 50, discount: '20% off', description: 'Blood thinner and pain reliever' },
  { id: '7', name: 'Multivitamin', dosage: 'Daily tablet', price: 150, originalPrice: 180, discount: '16.7% off', description: 'Nutritional supplement' },
  { id: '8', name: 'Metformin', dosage: '500mg', price: 100, originalPrice: 120, discount: '16.7% off', description: 'Oral diabetes medication' },
]

export const revalidate = 3600 // Revalidate the data at most every hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const query = searchParams.get('query')?.toLowerCase()

    let result = [...medicines]

    // Filter by ID if provided
    if (id) {
      const medicine = medicines.find(m => m.id === id)
      if (medicine) {
        return NextResponse.json(medicine, {
          headers: {
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          },
        })
      } else {
        return NextResponse.json({ error: 'Medicine not found' }, { status: 404 })
      }
    }

    // Filter by search query if provided
    if (query) {
      result = result.filter(m => 
        m.name.toLowerCase().includes(query) || 
        m.description.toLowerCase().includes(query)
      )
    }

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error in medicines API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medicines' },
      { status: 500 }
    )
  }
}
