import {notFound} from 'next/navigation';
import axios from 'axios';

export interface Cabin {
  _id: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image?: string;
}

export const getCabins = async (): Promise<Cabin[]> => {
  try {
    const response = await axios.get('http://localhost:8000/api/cabins');
    return response.data.rs;
  } catch {
    throw new Error('Không thể lấy danh sách cabin. Vui lòng thử lại sau.');
  }
};

export const getCabinById = async (cabinId: string): Promise<Cabin> => {
  try {
    const response = await axios.get(`http://localhost:8000/api/cabins/${cabinId}`);
    return response.data.rs; // Giả sử API trả về dữ liệu cabin trong response.data.rs
  } catch {
    // throw new Error(`Không thể lấy thông tin cabin với ID ${cabinId}. Vui lòng thử lại sau.`);
    notFound();
  }
};