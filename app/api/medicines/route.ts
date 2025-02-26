import { NextRequest, NextResponse } from 'next/server'
import type { Medicine, MedicineCreateInput, MedicineUpdateInput } from '@/types/medicine'

// Move the mock data to a separate file
import { mockMedicines } from '@/lib/data/medicines'
import { ApiError, handleApiError } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate the data at most every hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const query = searchParams.get('query')?.toLowerCase()
    const category = searchParams.get('category')
    const inStock = searchParams.get('inStock')

    let result = [...mockMedicines]

    // Filter by ID
    if (id) {
      const medicine = result.find(m => m.id === id)
      if (!medicine) {
        throw new ApiError(404, 'Medicine not found')
      }
      return NextResponse.json(medicine)
    }

    // Apply filters
    if (query) {
      result = result.filter(m => 
        m.name.toLowerCase().includes(query) || 
        m.description.toLowerCase().includes(query)
      )
    }

    if (category) {
      result = result.filter(m => m.category === category)
    }

    if (inStock === 'true') {
      result = result.filter(m => m.stock > 0)
    } else if (inStock === 'false') {
      result = result.filter(m => m.stock === 0)
    }

    return NextResponse.json(result)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MedicineCreateInput = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'category', 'manufacturer', 'dosage']
    for (const field of requiredFields) {
      if (!(field in body)) {
        throw new ApiError(400, `Missing required field: ${field}`)
      }
    }
    
    const newMedicine: Medicine = {
      ...body,
      id: (mockMedicines.length + 1).toString(),
      stock: body.stock ?? 0,
      threshold: body.threshold ?? 10,
    }
    
    mockMedicines.push(newMedicine)
    return NextResponse.json(newMedicine, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: MedicineUpdateInput = await request.json()
    
    if (!body.id) {
      throw new ApiError(400, 'Missing medicine ID')
    }
    
    const index = mockMedicines.findIndex(m => m.id === body.id)
    if (index === -1) {
      throw new ApiError(404, 'Medicine not found')
    }
    
    mockMedicines[index] = {
      ...mockMedicines[index],
      ...body
    }
    
    return NextResponse.json(mockMedicines[index])
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      throw new ApiError(400, 'Missing medicine ID')
    }
    
    const index = mockMedicines.findIndex(m => m.id === id)
    if (index === -1) {
      throw new ApiError(404, 'Medicine not found')
    }
    
    mockMedicines.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
