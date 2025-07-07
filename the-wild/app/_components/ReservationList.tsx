"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { Booking } from "@/app/_lib/data-bookings"; // Import interface Booking
import { deleteReservation } from '../_lib/actions';

// Định nghĩa kiểu cho props
interface ReservationListProps {
  bookings: Booking[];
  onDelete?: (bookingId: string) => Promise<void>;
}


export default function ReservationList({ bookings}: ReservationListProps) {
const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => { 
    return curBookings.filter((booking) => booking._id !== bookingId)
});

async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
}
    return (
        <ul className="space-y-6 px-12">
         {optimisticBookings.map((booking) => (
            <ReservationCard key={booking._id} onDelete={handleDelete} booking={booking} />
          ))}
        </ul>
    )
}