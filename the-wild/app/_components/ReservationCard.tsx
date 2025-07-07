import Image from "next/image";
import { Booking } from "../_lib/data-bookings";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteReservation from "./DeleteReservation";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) => {
  const parsedDate = parseISO(dateStr);
  const startDate = parsedDate.getTime();// Chuyển thành timestamp
  const now = new Date().getTime();// Chuyển thành timestamp

  // Kiểm tra xem parsedDate có hợp lệ không
  if (isNaN(startDate)) {
    console.error("Invalid date string:", dateStr);
    return "Invalid date"; 
  }

  return formatDistance(startDate, now, { addSuffix: true }).replace("about ", "");
};

interface ReservationCardProps {
  booking: Booking;
  onDelete: (bookingId: string) => Promise<void>; // Định nghĩa onDelete
}

export default function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  const { _id, createdAt, start_date, end_date, num_nights, num_guests, total_price, cabin_id: { name, image } } = booking;

  // Parse tất cả các chuỗi ngày thành đối tượng Date
  const parsedStartDate = parseISO(start_date);
  const parsedEndDate = parseISO(end_date);
  const parsedCreatedAt = parseISO(createdAt);

  // Kiểm tra xem parsedStartDate có hợp lệ không
  if (isNaN(parsedStartDate.getTime())) {
    console.error("Invalid start_date:", start_date);
    return null; // Or handle error appropriately
  }

  return (
    <div className="border border-primary-700 flex flex-row items-center justify-between">
      <div className="relative h-32 w-28">
        <Image
          fill
          quality={100}
          src={image || 'https://i.pinimg.com/736x/7f/06/e9/7f06e9c4a9b8a79aa2838c45dcf9dfe3.jpg'}
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 px-6 gap-3 justify-start">
        <div className="flex flex-col gap-1">
          <div className="flex-grow flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">
                {num_nights} nights in {name}
              </div>
              <div>
                {isPast(parsedStartDate) ? (
                  <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                    past
                  </span>
                ) : (
                  <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                    upcoming
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="justify-start text-primary-400">
            {format(parsedStartDate, "EEE, MMM dd yyyy")} - (
            {isToday(parsedStartDate)
              ? "Today"
              : formatDistanceFromNow(start_date)}
            ) — {format(parsedEndDate, "EEE, MMM dd yyyy")}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-accent-400">${total_price}</p>
            <p className="text-primary-300">•</p>
            <p className="text-lg text-primary-300">
              {num_guests ?? 0} guest{(num_guests ?? 0) > 1 && "s"}
            </p>
          </div>
          <div>
            <p className="ml-auto text-sm text-primary-400">
              Booked {format(parsedCreatedAt, "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-l border-primary-800 w-[100px] h-32">
        {!isPast(parsedStartDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${_id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={_id} onDelete={onDelete}/>
          </>
        ) : null}
      </div>
    </div>
  );
}