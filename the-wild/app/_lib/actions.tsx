"use server"

import { auth, signOut } from "./auth"
import { signIn } from "./auth"
import { revalidatePath } from 'next/cache';
import axios, { AxiosResponse } from 'axios';
import { getBookingsByGuestId } from "./data-bookings";
import { redirect } from "next/navigation";


// Định nghĩa interface cho API response
interface ApiResponse<T> {
  success: boolean;
  rs: T | string;
}

// Định nghĩa interface cho IGuest
interface IGuest {
  _id: string;
  full_name: string;
  email: string;
  nationality?: string;
  country_flag?: string;
  national_id?: string;

}
// Mở rộng kiểu User và Session từ NextAuth
declare module "next-auth" {
  interface User {
    guestId?: string;
  }
  interface Session {
    user?: User & {
      guestId?: string;
    };
  }
}



export async function updateGuest(formData) {
  //Authencation
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  
  // Kiểm tra session.user.guestId
  if (!session?.user?.guestId) {
    console.error('Missing session.user.guestId:', session);
    throw new Error("Missing guest ID in session");
  }
     
  const national_id = formData.get("national_id");
  const [nationality, country_flag] = formData.get("nationality").split("%");


  if (!national_id || !/^[a-zA-Z0-9]{6,12}$/.test(national_id))
    throw new Error("Please provide a valid national id");



  const updateData = { nationality, country_flag, national_id };

  try {
    const response: AxiosResponse<ApiResponse<IGuest>> = await axios.put(
      `http://localhost:8000/api/guests?guestId=${encodeURIComponent(session.user.guestId)}`,
      updateData
    );

    const { success, rs } = response.data;

    if (!success) throw new Error(typeof rs === 'string' ? rs : "Guest could not be updated");

    revalidatePath('/account/profile');
    revalidatePath('/account');
  
   
    
  } catch (error) {
    console.error('Error updating guest:', error);
    throw new Error("Guest could not be updated");
  }
  redirect('/account')
}

//create booking
export async function createBooking(bookingData, formData: FormData) {
  //Authencation
    const session = await auth();
    if (!session) throw new Error("You must be logged in");


    const newBooking = {
      ...bookingData,
      guest_id: session?.user?.guestId,
      num_guests: Number(formData.get("num_guests")),
      observations: formData.get("observations"),
      extras_price: 0,
      total_price: bookingData.cabin_price,
      is_paid: false,
      has_breakfast: false,
      status: "unconfirmed"
    }
    
    try {
    // Gọi API endpoint bằng Axios
    const response = await axios.post('http://localhost:8000/api/bookings', newBooking);

    // Xử lý phản hồi
    if (!response.data.success) {
      throw new Error(response.data.error || 'Booking could not be created');
    }

    // // Làm mới cache và chuyển hướng
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    // redirect('/cabins/thankyou');
  } catch (error) {
    console.error('Error creating booking:', error.message);
    throw new Error(error.response?.data?.error || 'Booking could not be created');
  }
}


//delete booking
export async function deleteReservation(bookingId) {
   //Authencation
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  

  //Authorization
  const guestBookings = await getBookingsByGuestId(session?.user?.guestId);
  const guestBookingIds = guestBookings ? guestBookings.map((booking) => booking._id) : [];

  // Kiểm tra quyền truy cập
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not allowed to delete this booking');
  }

  try {
    const response = await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`);

    if (response.data.success) {
      revalidatePath('/account/reservations');
      return response.data;
    } else {
      throw new Error(response.data.rs || 'Xóa đặt chỗ thất bại');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.rs 
      ? error.response.data.rs 
      : (error.message || 'Lỗi khi xóa đặt chỗ');
    throw new Error(errorMessage);
  }
}

//update booking

export async function updateBooking(formData: FormData) {
   console.log(formData)
const bookingId = formData.get("bookingId")?.toString();
  const num_guests = formData.get("num_guests")?.toString();
  const observations = formData.get("observations")?.toString();
//Authencation
   const session = await auth();
  if (!session) throw new Error("You must be logged in");

//Authorization
  const guestBookings = await getBookingsByGuestId(session?.user?.guestId);
  const guestBookingIds = guestBookings ? guestBookings.map((booking) => booking._id) : [];

  // Kiểm tra quyền truy cập
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not allowed to delete this booking');
  }


    const updateData = { num_guests, observations };

//Mution
      try {
    const response = await axios.put(
      `http://localhost:8000/api/bookings/${bookingId}`,
      updateData
    );

    const { success, rs } = response.data;

    if (!success) throw new Error(typeof rs === "string" ? rs : "Could not update booking");

   revalidatePath("/account/reservations");
    revalidatePath(`/account/reservations/edit/${bookingId}`);


  
  } catch (error) {
    console.error("Lỗi chi tiết:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.rs 
      ? error.response.data.rs 
      : (error.message || "Lỗi khi cập nhật đặt chỗ");
    throw new Error(errorMessage);
  }
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}