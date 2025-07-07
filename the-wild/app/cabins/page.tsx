
import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import {Spinner} from "@heroui/spinner"
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 0;

export const metadata = {
  title: "Cabins",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const filter = Array.isArray(params?.capacity) ? params.capacity[0] : params?.capacity ?? "all";

  return (
   
    <div className="">
      <h1 className="text-4xl mb-5 text-accent-500 font-medium">Our Luxury Cabins</h1>
      <p className="text-lg text-primary-200">Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites.
         Imagine waking up to beautiful mountain views, spending your days exploring the
          dark forests around, or just relaxing in your private hot tub under the stars.
           Enjoy nature&apos;s beauty in your own little home away from home. The perfect spot
            for a peaceful, calm vacation. Welcome to paradise.</p>

            <div className="flex justify-end">
              <Filter />
            </div>
           <Suspense fallback={<Spinner className="flex items-center justify-center" color="warning" label="Loading data..." />}
           key={filter}>
          <CabinList filter={filter} />
          <ReservationReminder />
          </Suspense>
    </div>
    
  );
}
