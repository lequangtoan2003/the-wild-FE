import Image from 'next/image';
import { Cabin } from '../_lib/data-cabins';
import Link from 'next/link';


export default function CabinCard({ cabin }: { cabin: Cabin } ) {
    
    const { _id, name, max_capacity, regular_price, discount, image} = cabin;
    const totalPrice = regular_price - discount;
  return (
    <div className="">
      <div className="flex border-primary-800 border-[1px]">
       <div className="h-48">
        <div className="relative w-40 h-48 border-gray-100 border-[1px] overflow-hidden">
         <Image
              fill
              quality={100}
              src={image || 'https://i.pinimg.com/736x/7f/06/e9/7f06e9c4a9b8a79aa2838c45dcf9dfe3.jpg'} // Sử dụng URL trực tiếp hoặc fallback
              alt={`Cabin ${name}`}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
        </div>
       </div>


       <div className="flex-1 w-full">
            
          <div className="flex flex-col justify-between h-full">
              <div className="p-5">
                <div className="">
                    <p className='text-accent-500 font-medium text-2xl'>Cabin {name}</p>
                    <p>For up to {max_capacity} guests</p>
                </div>
                <div className="flex justify-end">
                    <div className="flex justify-center items-end gap-2">
                        <div className="font-normal text-4xl">
                            {discount > 0 ? (
                            <div className="">${totalPrice}</div>
                                ) : (
                                    ""
                            )}
                        </div>
                        <div className="text-gray-400 line-through">
                            ${regular_price}
                                                            {/* <p>Discount: {discount}%</p> */}
                        </div>
                        <div className="">
                             / night
                        </div>
                    </div>
                  
                </div>
            </div>
            <div className="flex border-t-[1px] border-primary-800">
                <div className="w-[50%] border-r-[1px] border-primary-800">

                </div>
                <Link href={`/cabins/${_id}`} className="flex-1 p-4 hover:bg-accent-600 transition-all">
                    Details & Reservation &rarr;
                </Link>
                
            </div>
          </div>

        </div>
            
      </div>

    </div>
  );
}
