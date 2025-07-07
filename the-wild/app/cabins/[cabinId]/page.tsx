
import { Suspense } from "react";
import Cabins from "../../_components/Cabin";
import { getCabinById, getCabins } from "../../_lib/data-cabins";
import Reservation from "@/app/_components/Reservation";
import {Spinner} from "@heroui/spinner";




export async function generateMetadata({ params }: { params: Promise<{ cabinId: string }> }) {
  const resolvedParams = await params; // Await params để lấy cabinId
  const cabinId = resolvedParams.cabinId;
  const { name } = await getCabinById(cabinId);
  return { title: `Cabin ${name}` };
}


export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin._id) }));

  return ids;
}


export default async function Page({ params }: { params: Promise<{ cabinId: string }> }) {
  const resolvedParams = await params; // Await params để lấy cabinId
  const cabinId = resolvedParams.cabinId;
  const cabin = await getCabinById(cabinId);
//   const settings = await getSettings();
//   const bookedDates = await getBookedDatesByCabinId(cabinId)

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabins cabin={cabin} />
      <div>
        <h2 className="text-5xl text-accent-500 font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner color="warning" label="Loading data..."/>}>
            <Reservation cabin={cabin}/>
        </Suspense>
      </div>
    </div>
  );
}