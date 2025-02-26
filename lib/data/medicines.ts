import type { Medicine } from '@/types/medicine';

// Mock data for medicines
export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    description: "Effective pain reliever and fever reducer for mild to moderate pain",
    category: "Pain Relief",
    price: 49.99,
    originalPrice: 59.99,
    stock: 150,
    threshold: 50,
    manufacturer: "GSK",
    expiryDate: "2025-12-31",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    dosage: "500mg",
    discount: "16% off"
  },
  {
    id: "2",
    name: "Ibuprofen",
    description: "Anti-inflammatory medication for pain and fever relief",
    category: "Pain Relief",
    price: 89.99,
    originalPrice: 99.99,
    stock: 120,
    threshold: 40,
    manufacturer: "Pfizer",
    expiryDate: "2025-10-15",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800",
    dosage: "400mg",
    discount: "10% off"
  },
  {
    id: "3",
    name: "Aspirin",
    description: "Blood-thinning pain reliever for various conditions",
    category: "Pain Relief",
    price: 39.99,
    originalPrice: 45.99,
    stock: 200,
    threshold: 60,
    manufacturer: "Bayer",
    expiryDate: "2025-11-30",
    image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=800",
    dosage: "300mg",
    discount: "13% off"
  },
  {
    id: "4",
    name: "Amoxicillin",
    description: "Broad-spectrum antibiotic for bacterial infections",
    category: "Antibiotics",
    price: 149.99,
    originalPrice: 179.99,
    stock: 80,
    threshold: 30,
    manufacturer: "Novartis",
    expiryDate: "2025-09-20",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=800",
    dosage: "500mg",
    discount: "17% off"
  },
  {
    id: "5",
    name: "Omeprazole",
    description: "Proton pump inhibitor for acid reflux and ulcers",
    category: "Digestive Health",
    price: 129.99,
    originalPrice: 149.99,
    stock: 100,
    threshold: 35,
    manufacturer: "AstraZeneca",
    expiryDate: "2025-08-25",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800",
    dosage: "20mg",
    discount: "13% off"
  }
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