import { useState, useCallback } from 'react';
import { Medicine, MedicineCreateInput, MedicineUpdateInput } from '@/types/medicine';
import { medicineService } from '@/services/medicineService';
import { toast } from 'react-hot-toast';

export function useMedicines() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : 'An error occurred';
    setError(message);
    toast.error(message);
  };

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await medicineService.getAll();
    } catch (error) {
      handleError(error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createMedicine = useCallback(async (data: MedicineCreateInput) => {
    try {
      setLoading(true);
      setError(null);
      const medicine = await medicineService.create(data);
      toast.success('Medicine created successfully');
      return medicine;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMedicine = useCallback(async (data: MedicineUpdateInput) => {
    try {
      setLoading(true);
      setError(null);
      const medicine = await medicineService.update(data);
      toast.success('Medicine updated successfully');
      return medicine;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMedicine = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await medicineService.delete(id);
      toast.success('Medicine deleted successfully');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchMedicines,
    createMedicine,
    updateMedicine,
    deleteMedicine
  };
} 