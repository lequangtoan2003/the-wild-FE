import axios, { AxiosResponse } from 'axios';
// models/Guest.ts
export interface IGuest {
  _id: string;
  full_name: string;
  email: string;
  nationality?: string;
  country_flag?: string;
  national_id?: string;
}


// Định nghĩa type cho response từ API
interface ApiResponse<T> {
  success: boolean;
  rs: T | string; // rs có thể là IGuest hoặc string (lỗi)
}


export async function getGuest(email: string): Promise<IGuest | null> {
  try {
    const response: AxiosResponse<IGuest | null> = await axios.get(
      `http://localhost:8000/api/get-by-email?email=${encodeURIComponent(email)}`, 
    );
    return response.data || null;
  } catch (error) {
    console.error('Error fetching guest:', error);
    return null;
  }
}

export async function createGuest(newGuest: { email: string; full_name: string }): Promise<IGuest> {
  try {
    const response: AxiosResponse<ApiResponse<IGuest>> = await axios.post(
      'http://localhost:8000/api/guests',
      newGuest
    );

    const { success, rs } = response.data;

    if (!success) {
      // Type guard để kiểm tra rs là string (lỗi)
      if (typeof rs === 'string') {
        throw new Error(rs || 'Guest could not be created');
      } else {
        throw new Error('Guest could not be created'); // Trường hợp rs không phải string
      }
    }

    // Kiểm tra rs là IGuest trước khi trả về
    if (rs && typeof rs === 'object' && '_id' in rs) {
      return rs as IGuest;
    } else {
      throw new Error('Invalid guest data received');
    }
  } catch (error) {
    console.error('Error creating guest:', error);
    if (error instanceof Error) {
      throw error; // Ném lỗi gốc nếu có
    }
    throw new Error('Guest could not be created');
  }
}