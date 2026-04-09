// hooks/useContact.ts
import { useState } from 'react';
import { sendContactMessage, ContactData } from '@/api/contact';

interface UseContactReturn {
  sendMessage: (data: ContactData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useContact = (): UseContactReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: ContactData) => {
    try {
      setLoading(true);
      await sendContactMessage(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};