export interface Medicine {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  threshold: number;
  manufacturer: string;
  expiryDate: string;
  image: string;
  dosage?: string;
  discount?: string;
}

export interface MedicineCreateInput extends Omit<Medicine, 'id'> {}

export interface MedicineUpdateInput extends Partial<Medicine> {
  id: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
} 