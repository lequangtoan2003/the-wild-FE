import ReservationList from "@/app/_components/ReservationList";
import { getBookingsByGuestId } from "../../_lib/data-bookings";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";

// Định nghĩa interface
interface User {
  email: string;
  name?: string;
  image?: string;
  guestId?: string;
  nationality?: string; 
  country_flag?: string; 
  national_id?: string;
}

interface Session {
  user: User;
}

// Gán kiểu dữ liệu cho auth
const typedAuth = auth as () => Promise<Session>;

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await typedAuth();

  // Kiểm tra session và guestId
  if (!session?.user || !session.user.guestId) {
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Your reservations
        </h2>
        <p className="text-lg">
          You need to be logged in or have a guest ID to view your reservations. Please{" "}
          <Link className="underline text-accent-500" href="/login">
            log in →
          </Link>
        </p>
      </div>
    );
  }

  const bookings = await getBookingsByGuestId(session.user.guestId);

 
  return (
    <div className="">
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins →
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}