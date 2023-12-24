'use client';
import Link from 'next/link';
import Links from './links';

export default function SideNav() {
  return (
    <nav className="flex gap-x-40 lg:flex-col bg-[#F6F8FE] px-3 py-4 md:px-5">
      <Link href="/profile" className="mb-8 rounded-md">
        Logo
      </Link>
      <div className="flex grow flex-row space-x-3 lg:flex-col lg:space-x-0 lg:space-y-3">
        <Links />
      </div>
    </nav>
  );
}
