"use client"

import { TrashIcon } from '@heroicons/react/24/solid';

import { useTransition } from 'react';
import {Spinner} from "@heroui/spinner";

interface DeleteReservationProps {
  bookingId: string; 
  onDelete: (bookingId: string) => Promise<void>; // Định nghĩa onDelete là hàm async
}
function DeleteReservation({ bookingId, onDelete }: DeleteReservationProps) {
   
    const [isPending, startTransition] = useTransition();
    console.log("ispending : ",isPending)

    function handleDelete() {
        if (confirm("Are u sure u want to delete this reservation?")) 
            startTransition(() => onDelete(bookingId));
    }

  return (
    <button onClick={handleDelete} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <Spinner label='loading data...'/>
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;