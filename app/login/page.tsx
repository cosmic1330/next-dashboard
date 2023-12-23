import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Link href="/dashboard" className="my-link-button my-link-button-blue">
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
