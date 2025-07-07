import axios from 'axios';
import { eachDayOfInterval } from 'date-fns';

export interface Booking {
  _id: string;
  guestId?: number;
  start_date: string;
  end_date: string;
  num_nights?: number;
  num_guests?: number;
  cabin_price?: number;
  total_price?: number;
  status: string;
  createdAt: string;
  cabin_id: {
    _id: string,
    name: string,
    image: string,
  },
  observations?: string
}

export async function getBooking(): Promise<Booking[]> {
  try {
    const res = await axios.get('http://localhost:8000/api/bookings');
    return res.data.rs;
  } catch {
    throw new Error('Không thể tải danh sách đặt phòng');
  }
}

export async function getBookingById(bookingId :  string): Promise<Promise<Booking>> {
  try {
    const res = await axios.get(`http://localhost:8000/api/bookings/${bookingId}`);
    console.log("booking data:", res.data.rs)
    return res.data.rs;
  } catch {
    throw new Error('Không thể tải danh sách đặt phòng');
  }
}

export async function getBookedDatesByCabinId(cabinId: string): Promise<Date[]> {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Gọi API
    const res = await axios.get(`http://localhost:8000/api/bookings/cabin/${cabinId}/booked-dates`);
    
    if (!res.data.success) {
      throw new Error(res.data.rs || 'Không thể tải danh sách ngày đã đặt');
    }

    const bookings: Booking[] = res.data.rs;

    // Lọc bookings từ hôm nay trở đi hoặc trạng thái checked-in
    const filteredBookings = bookings.filter(
      (booking) =>
        new Date(booking.start_date) >= today || booking.status === 'checked-in'
    );

    // Tạo mảng chứa các ngày đã được đặt
    const bookedDates: Date[] = [];

    filteredBookings.forEach((booking) => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);

      // Đảm bảo khoảng ngày hợp lệ
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return;
      }

      // Tạo danh sách các ngày trong khoảng
      const dates = eachDayOfInterval({ start, end });

      // Chuẩn hóa từng ngày về 00:00:00 UTC
      const normalizedDates = dates.map((date) => {
        const normalized = new Date(date);
        normalized.setUTCHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 UTC
        return normalized;
      });

      bookedDates.push(...normalizedDates); // Thêm các ngày đã chuẩn hóa
    });

    return bookedDates;
   
  } catch (error) {
    console.error('Lỗi khi tải danh sách ngày đã đặt:', error);
    throw new Error('Không thể tải danh sách ngày đã đặt');
  }
}



export async function getBookingsByGuestId(guestId: string): Promise<Booking[]> {
  if (!guestId) {
    throw new Error('Missing guest ID');
  }

  try {
    const res = await axios.get(
      `http://localhost:8000/api/bookings?guestId=${guestId}`
    );
    
    if (!res.data.success) {
      throw new Error(
        typeof res.data.rs === 'string' ? res.data.rs : 'Failed to fetch bookings'
      );
    }

    if (typeof res.data.rs === 'string') {
      return [];
    }

    return res.data.rs;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Không thể tải danh sách đặt phòng');
  }
}