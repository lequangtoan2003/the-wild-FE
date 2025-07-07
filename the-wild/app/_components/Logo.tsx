import Image from 'next/image';
import logo from '../../public/logo.png'
import Link from 'next/link';

export default function Logo() {
  return (
      <Link href='/' className='flex items-center gap-2 z-10'>
      <Image src={logo} quality={100} alt="" className='w-10 h-10' />
      <h1 className="font-bold text-xl text-accent-700">The Wild</h1>
      </Link>
  );
}
