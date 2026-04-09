// api/contact.ts
import httpClient from '@/utils/httpClient';

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (data: ContactData): Promise<void> => {
  await httpClient.post('/contact/', data);
};