import { notFound } from 'next/navigation';
import axios from 'axios';

export interface Settings {
  _id: string
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export const getSettings = async (): Promise<Settings> => {
  try {
    const response = await axios.get('http://localhost:8000/api/settings');
    return response.data.rs;
  } catch {
    throw new Error('Không thể lấy danh sách thiết lập. Vui lòng thử lại sau.');
  }
};

export const getSettingById = async (settingId: string): Promise<Settings> => {
  try {
    const response = await axios.get(`http://localhost:8000/api/settings/${settingId}`);
    return response.data.rs; // Giả sử API trả về dữ liệu setting trong response.data.rs
  } catch {
    notFound();
  }
};