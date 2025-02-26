import type { Medicine } from '@/types/medicine';

// Mock data for medicines
export const mockMedicines: Medicine[] = [
  // Common Pain Relievers
  { id: "1", name: "Paracetamol", description: "Pain reliever and fever reducer", category: "Pain Relief", price: 49.99, originalPrice: 59.99, stock: 150, threshold: 50, manufacturer: "GSK", expiryDate: "2025-12-31", image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Paracetamol", dosage: "500mg", discount: "16% off" },
  // ... rest of your mock data
];

// Helper function to generate additional medicines
export function generateAdditionalMedicines(startId: number = 11, count: number = 90): Medicine[] {
  const categories = ["Pain Relief", "Antibiotics", "Allergy", "Digestive Health", "Vitamins", "Cardiovascular", "Diabetes", "Respiratory", "Mental Health", "Skin Care"];
  const manufacturers = ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Zydus", "Mankind", "Intas", "Torrent", "Alkem", "Glenmark"];
  
  const additionalMedicines: Medicine[] = [];
  
  for (let i = startId; i < startId + count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const basePrice = Math.floor(Math.random() * (1000 - 50) + 50);
    const discountPercent = Math.floor(Math.random() * 20) + 5;
    const originalPrice = Math.round(basePrice * (100 + discountPercent) / 100);
    const stock = Math.floor(Math.random() * (200 - 30) + 30);
    const threshold = Math.floor(stock * 0.3);

    additionalMedicines.push({
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
  
  return additionalMedicines;
}

// Initialize the full medicine list
mockMedicines.push(...generateAdditionalMedicines()); 