import { Medicine, MedicineCreateInput, MedicineUpdateInput } from '@/types/medicine';

const API_BASE = '/api/medicines';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const defaultOptions = {
  credentials: 'include' as RequestCredentials,
  headers: defaultHeaders,
};

export const medicineService = {
  getAll: async (): Promise<Medicine[]> => {
    const res = await fetch(API_BASE, {
      ...defaultOptions,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch medicines');
    return res.json();
  },

  getById: async (id: string): Promise<Medicine | null> => {
    const res = await fetch(`${API_BASE}?id=${id}`, {
      ...defaultOptions,
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch medicine');
    }
    return res.json();
  },

  create: async (medicine: MedicineCreateInput): Promise<Medicine> => {
    const res = await fetch(API_BASE, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(medicine),
      cache: 'no-store' // Don't cache mutations
    });
    if (!res.ok) throw new Error('Failed to create medicine');
    return res.json();
  },

  update: async (medicine: MedicineUpdateInput): Promise<Medicine> => {
    const res = await fetch(API_BASE, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify(medicine),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to update medicine');
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}?id=${id}`, {
      ...defaultOptions,
      method: 'DELETE',
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to delete medicine');
  },

  getLowStock: async (): Promise<Medicine[]> => {
    const medicines = await medicineService.getAll();
    return medicines.filter(m => m.stock <= m.threshold);
  }
}; 