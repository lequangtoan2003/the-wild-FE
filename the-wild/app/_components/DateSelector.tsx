"use client"

import { differenceInDays, isWithinInterval, isPast, isSameDay } from "date-fns";
import "react-day-picker/dist/style.css";

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Cabin } from "../_lib/data-cabins";

import { Settings } from "../_lib/data-settings";
import { useReservation } from "./ReservationContext";

interface DateSelectorProps {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}
function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]): boolean {
  if (!range?.from || !range.to) return false;

 

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}


function DateSelector( { settings, bookedDates, cabin }: DateSelectorProps) {
   const {range, setRange, resetRange} = useReservation();

   console.log("bookedDates data FE", bookedDates.map((d) => d.toString()));

   // Chuẩn hóa bookedDates để đảm bảo giờ là 00:00:00 UTC
  const normalizedBookedDates = bookedDates.map((date) => {
    const normalized = new Date(date);
    normalized.setUTCHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 UTC
    return normalized;
  });
// Chuyển bookedDates thành mảng Date để sử dụng .some()
  // const bookedDatesArray = Object.keys(bookedDates)
  //   .filter((date) => bookedDates[date]) // Chỉ lấy các ngày true
  //   .map((dateStr) => new Date(dateStr));

    const displayRange = isAlreadyBooked(range, normalizedBookedDates) ? undefined : range
  // CHANGE

  const { regular_price, discount } = cabin;
  const num_nights = displayRange?.to && displayRange?.from ? differenceInDays(displayRange.to, displayRange.from) : 0;
  const cabin_price = num_nights * (regular_price - discount);



  // SETTINGS
//   const min_booking_length = 1;
//   const max_booking_length = 23;
  const {min_booking_length , max_booking_length} = settings
  

    




  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={min_booking_length + 1}
        max={max_booking_length}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) => isPast(curDate) || bookedDates.some(date=>isSameDay(date, curDate))}
        classNames={{
          months: "flex flex-row gap-4",
        //   day: "hover:bg-orange-200 hover:text-orange-900 w-7 h-7 rounded-full transition-colors duration-200", // Hiệu ứng hover
        //   day_selected: "bg-blue-600 text-white rounded-full",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {num_nights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{num_nights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabin_price}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default DateSelector;