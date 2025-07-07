"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Định nghĩa interface cho props của Button
interface ButtonProps {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: string;
}

export default function Filter() {
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();

    const activeFilter = searchParams.get("capacity") ?? "all";


    function handleFilter(filter: string){
      const params = new URLSearchParams(searchParams);
      params.set("capacity", filter);
      router.replace(`${pathname}?${params.toString()}`, {scroll: false});

    }
    return (
        <div className="flex border-[1px] border-primary-800 p-2">
            <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>
                All cabins
            </Button>
             <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>
                2&mdash;3 guest
            </Button>
            <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>
                4&mdash;7 guest
            </Button>
             <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>
                8&mdash;12 guest
            </Button>
        </div>
    )
    
}
function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`p-2 hover:bg-primary-800 focus:outline-none ${
        filter === activeFilter ? " text-red-500" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}