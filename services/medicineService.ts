import { Medicine, MedicineCreateInput, MedicineUpdateInput } from '@/types/medicine';

// Generate 100 medicines with realistic data
const generateMockMedicines = (): Medicine[] => {
  const medicines: Medicine[] = [
    // Common Pain Relievers
    { id: "1", name: "Paracetamol", description: "Pain reliever and fever reducer", category: "Pain Relief", price: 49.99, originalPrice: 59.99, stock: 150, threshold: 50, manufacturer: "GSK", expiryDate: "2025-12-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Paracetamol", dosage: "500mg", discount: "16% off" },
    { id: "2", name: "Ibuprofen", description: "NSAID for pain and inflammation", category: "Pain Relief", price: 89.99, originalPrice: 99.99, stock: 120, threshold: 40, manufacturer: "Cipla", expiryDate: "2025-11-30", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Ibuprofen", dosage: "400mg", discount: "10% off" },
    { id: "3", name: "Aspirin", description: "Pain reliever and blood thinner", category: "Pain Relief", price: 39.99, originalPrice: 45.99, stock: 200, threshold: 60, manufacturer: "Bayer", expiryDate: "2025-10-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Aspirin", dosage: "325mg", discount: "13% off" },
    
    // Antibiotics
    { id: "4", name: "Amoxicillin", description: "Antibiotic for bacterial infections", category: "Antibiotics", price: 149.99, originalPrice: 169.99, stock: 80, threshold: 30, manufacturer: "Sun Pharma", expiryDate: "2025-09-30", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Amoxicillin", dosage: "500mg", discount: "12% off" },
    { id: "5", name: "Azithromycin", description: "Antibiotic for respiratory infections", category: "Antibiotics", price: 199.99, originalPrice: 229.99, stock: 60, threshold: 25, manufacturer: "Pfizer", expiryDate: "2025-08-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Azithromycin", dosage: "250mg", discount: "13% off" },
    
    // Antihistamines
    { id: "6", name: "Cetirizine", description: "Antihistamine for allergies", category: "Allergy", price: 79.99, originalPrice: 89.99, stock: 100, threshold: 35, manufacturer: "Dr. Reddy's", expiryDate: "2025-07-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Cetirizine", dosage: "10mg", discount: "11% off" },
    { id: "7", name: "Loratadine", description: "Non-drowsy antihistamine", category: "Allergy", price: 89.99, originalPrice: 99.99, stock: 90, threshold: 30, manufacturer: "AllerCure", expiryDate: "2025-06-30", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Loratadine", dosage: "10mg", discount: "10% off" },
    
    // Antacids
    { id: "8", name: "Omeprazole", description: "Proton pump inhibitor for acid reflux", category: "Digestive Health", price: 129.99, originalPrice: 149.99, stock: 70, threshold: 25, manufacturer: "AstraZeneca", expiryDate: "2025-05-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Omeprazole", dosage: "20mg", discount: "13% off" },
    { id: "9", name: "Pantoprazole", description: "For acid reflux and ulcers", category: "Digestive Health", price: 139.99, originalPrice: 159.99, stock: 65, threshold: 25, manufacturer: "Takeda", expiryDate: "2025-04-30", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Pantoprazole", dosage: "40mg", discount: "12% off" },
    
    // Vitamins
    { id: "10", name: "Vitamin D3", description: "Supports bone health", category: "Vitamins", price: 299.99, originalPrice: 349.99, stock: 120, threshold: 40, manufacturer: "HealthVit", expiryDate: "2025-03-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=VitaminD3", dosage: "1000IU", discount: "14% off" }
  ];

  // Generate additional medicines
  const categories = ["Pain Relief", "Antibiotics", "Allergy", "Digestive Health", "Vitamins", "Cardiovascular", "Diabetes", "Respiratory", "Mental Health", "Skin Care"];
  const manufacturers = ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Zydus", "Mankind", "Intas", "Torrent", "Alkem", "Glenmark"];

  for (let i = 11; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const basePrice = Math.floor(Math.random() * (1000 - 50) + 50);
    const discountPercent = Math.floor(Math.random() * 20) + 5;
    const originalPrice = Math.round(basePrice * (100 + discountPercent) / 100);
    const stock = Math.floor(Math.random() * (200 - 30) + 30);
    const threshold = Math.floor(stock * 0.3);

    medicines.push({
      id: i.toString(),
      name: `Medicine-${i}`,
      description: `Medical treatment for ${category.toLowerCase()} conditions`,
      category,
      price: basePrice,
      originalPrice,
      stock,
      threshold,
      manufacturer,
      expiryDate: `2025-${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 28) + 1}`,
      image: `https://placehold.co/400x300/e2e8f0/1e293b?text=Medicine-${i}`,
      dosage: `${Math.floor(Math.random() * 500) + 100}mg`,
      discount: `${discountPercent}% off`
    });
  }

  return medicines;
};

const mockMedicines = generateMockMedicines();

export const medicineService = {
  // Get all medicines
  getAll: async (): Promise<Medicine[]> => {
    // TODO: Replace with actual API call
    return mockMedicines;
  },

  // Get a single medicine by ID
  getById: async (id: string): Promise<Medicine | null> => {
    // TODO: Replace with actual API call
    const medicine = mockMedicines.find(m => m.id === id);
    return medicine || null;
  },

  // Create a new medicine
  create: async (medicine: MedicineCreateInput): Promise<Medicine> => {
    // TODO: Replace with actual API call
    const newMedicine = {
      ...medicine,
      id: (mockMedicines.length + 1).toString()
    };
    mockMedicines.push(newMedicine);
    return newMedicine;
  },

  // Update an existing medicine
  update: async (medicine: MedicineUpdateInput): Promise<Medicine> => {
    // TODO: Replace with actual API call
    const index = mockMedicines.findIndex(m => m.id === medicine.id);
    if (index === -1) {
      throw new Error('Medicine not found');
    }
    mockMedicines[index] = {
      ...mockMedicines[index],
      ...medicine
    };
    return mockMedicines[index];
  },

  // Delete a medicine
  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    const index = mockMedicines.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Medicine not found');
    }
    mockMedicines.splice(index, 1);
  },

  // Get low stock medicines
  getLowStock: async (): Promise<Medicine[]> => {
    // TODO: Replace with actual API call
    return mockMedicines.filter(m => m.stock <= m.threshold);
  }
}; 