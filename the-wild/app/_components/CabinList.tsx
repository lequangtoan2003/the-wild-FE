import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-cabins";


export default async function CabinList({filter}: { filter?: string }) {
     const cabins = await getCabins();
     if(!cabins.length) return null;

     let displayCabins = cabins;
     if(filter === 'all') displayCabins = cabins;
     if(filter === 'small') displayCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
     if(filter === 'medium') displayCabins = cabins.filter((cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7);
     if(filter === 'large') displayCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
     

  return (
    <div className="grid grid-cols-2 gap-10 pt-6">
              {displayCabins.map((cabin, index) => (
                <CabinCard
                  key={`${cabin._id}-${index}`} 
                  cabin={cabin}
                />
              ))}
    </div>
  );
}