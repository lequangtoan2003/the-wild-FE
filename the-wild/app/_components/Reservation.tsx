import { getBookedDatesByCabinId } from "../_lib/data-bookings";
import { getSettings } from "../_lib/data-settings";
import DateSelector from "../_components/DateSelector";
import ReservationForm from "./ReservationForm";
import { Cabin } from "../_lib/data-cabins";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

interface User {
    name:string;
    email:string;
    image: string;
}


async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin._id),
  ]);

  const session = await auth();

  return (
    <div className="flex border-[1px] border-primary-700 z-20">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user as User} 
        />
      ) : (
        <div className="flex-1 items-center justify-center">
            <LoginMessage />
        </div>
      )}
    </div>
  );
}

export default Reservation;