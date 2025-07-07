"use client";

import TextExpander from "@/app/_components/TextExpander";
import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Cabin } from "../_lib/data-cabins"


export default function Cabins({ cabin }: { cabin: Cabin }) {
     const { name, max_capacity, description, image } = cabin;
  return (
   <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            fill
            quality={100}
            src={image || 'https://i.pinimg.com/736x/7f/06/e9/7f06e9c4a9b8a79aa2838c45dcf9dfe3.jpg'}
            alt={`Cabin ${name}`}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-accent-200 font-black text-6xl mb-5 translate-x-[-254px] bg-primary-900 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>
          <div className="text-lg text-primary-300 mb-10">
            <TextExpander>
                {description}
            </TextExpander>
          </div>
          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{max_capacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
  );
}
