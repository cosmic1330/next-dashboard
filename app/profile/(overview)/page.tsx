import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className="h-full lg:grid lg:grid-cols-[1fr_320px]">
      <article className="overflow-y-auto p-5 lg:p-10">
        <section className="mb-5 grid grid-cols-2">
          <div>
            <h1 className="mb-2	text-5xl">Hi, User👋</h1>
            <span className="text-gray-500">
              {"Welcome back & Let's hiring today"}
            </span>
          </div>
          <div className="text-right"></div>
        </section>
        <section className="grid gap-6 lg:row-span-full lg:grid-cols-3 lg:grid-rows-2">
          <div className="rounded-2xl border-2 border-solid border-gray-200 p-5 lg:col-span-2">
            <h2 className="text-2xl">My Hiking</h2>
            <span className="text-lg text-gray-400">Here mywork</span>
          </div>
          <div className="rounded-2xl border-2 border-solid border-gray-200 p-5" />
          <div className="rounded-2xl border-2 border-solid border-gray-200 p-5 lg:col-span-2" />
          <div className="overflow-hidden rounded-2xl border-solid bg-[#C5E7FF] p-2 lg:p-0 ">
            <Image
              src="/profile/hire.png"
              width={100}
              height={100}
              className="w-1/4 lg:w-full"
              alt="hire"
            />
            <div className="bg-white p-5 rounded-2xl flex gap-6 justify-center">
              <div>
                <p className="font-semibold">I want you</p>
                <span className='text-gray-500 text-xs'>Send JB for you...</span>
              </div>
              <button className="rounded-full bg-blue-600 text-white p-3 shadow-lg">
                <ArrowRightIcon className="w-6" />
              </button>
            </div>
          </div>
        </section>
      </article>
      <article className="relative bg-[#C5E7FF] bg-[url('/profile/bg2.jpg')] bg-[length:100%_auto] bg-fixed bg-bottom bg-no-repeat p-5 lg:bg-[url('/profile/bg.png')] lg:bg-contain lg:bg-local">
        <h2 className="mb-8 text-center text-4xl lg:text-left lg:text-xl">
          My Profile
        </h2>
        <div className="grid grid-cols-2 lg:block">
          <div>
            <Image
              src="/hero-desktop.png"
              width={100}
              height={100}
              className="m-auto h-32 w-32 rounded-full"
              alt="Profile Head"
            />
            <h3 className="text-center font-header text-2xl">Paggie</h3>
            <p className="mb-8 text-center text-gray-500">{'Enginner'}</p>
          </div>
          <div className=" lg:w-9/10 m-auto flex h-14 w-full justify-between rounded-xl bg-white p-4 ">
            <div className="flex items-center gap-2">
              <Image
                src="/profile/degree.png"
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
                alt="Degree"
              />
              <div className="leading-[0.8]">
                <p className="text-sm text-gray-500">Degree</p>
                <p>Master</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/profile/tree.png"
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
                alt="Experience"
              />
              <div className="leading-[0.7]">
                <p className="text-sm text-gray-500">Experience</p>
                <p>5Y</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
