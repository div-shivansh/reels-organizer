"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession()
  
  return (
    <main className="min-h-[86vh] bg-neutral-800">
      <section className="min-h-[86vh] bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] flex items-center justify-between sticky top-[7.8vh]">
        <div className="left w-full px-40 flex justify-center flex-col gap-6">
          <h1 className="text-7xl font-bold text-white text-start w-4/5">
            Effortlessly Organize Your Instagram Reels
          </h1>
          <p className="text-2xl text-gray-100 text-start w-4/5">
            The Ultimate Reels Organizer is here to declutter your saved content. Categorize, filter, and find your favourite reels in seconds.
          </p>
          <div className="buttons flex items-center gap-7 px-15">
            <a href="#steps"><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent  text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Get Started</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-black">Get Started</span>
              </div>
            </div></a>
            <Link href={"/about"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">About Us</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-black">About Us</span>
              </div>
            </div></Link>
          </div>
        </div>
        <div className="right w-full flex items-center justify-center">
          <Image src={"/Landing.png"} priority width={855} height={744} alt="banner" className="w-auto"/>
        </div>
      </section>
      <section id="steps" className="sticky top-[7.8vh] bg-neutral-800">
        <div className="text-white flex flex-col items-center p-2 min-h-[172vh]">
          <h2 className="text-7xl font-semibold mt-10">How It Works</h2>
          <p className="text-gray-300 text-xl w-5/12 text-center mt-4">Organizing your favourite reels has never been easier. Follow these simple steps to get started.</p>
          <div className="steps flex flex-col items-center justify-center mt-15 relative">
          <div className="w-1 h-[77.5em] bg-white rounded-full"></div>
          <div className="bg-gray-600 w-30 h-30 rounded-full drop-shadow-xl top-[5em] absolute flex items-center justify-center p-2">
            <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
            <span className="material-symbols-outlined icon-lg">Login</span>
            </div>
            <div className="bg-neutral-950 w-[35em] h-40 absolute right-40 rounded-xl flex justify-center items-end flex-col p-4 gap-2 drop-shadow-xl">
              <h3 className="text-4xl font-semibold">Step 1: Login</h3>
              <p className="text-end text-2xl text-neutral-400">Create an account or log in to start organizing your reels.</p>
            </div>
          </div>
          <div className="bg-gray-600 w-30 h-30 rounded-full drop-shadow-xl top-[20em] absolute flex items-center justify-center p-2">
            <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
            <span className="material-symbols-outlined icon-lg">Person_Add</span>
            </div>
            <div className="bg-neutral-950 w-[35em] h-40 absolute left-40 rounded-xl flex justify-center items-start flex-col p-4 gap-2 drop-shadow-xl">
              <h3 className="text-4xl font-semibold">Step 2: Create Profile</h3>
              <p className="text-start text-2xl text-neutral-400">Personalize your experience by setting up your profile with your interests.</p>
            </div>
            </div>
          <div className="bg-gray-600 w-30 h-30 rounded-full drop-shadow-xl top-[35em] absolute flex items-center justify-center p-2">
            <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
            <span className="material-symbols-outlined icon-lg">Link</span>
            </div>
            <div className="bg-neutral-950 w-[35em] h-40 absolute right-40 rounded-xl flex justify-center items-end flex-col p-4 gap-2 drop-shadow-xl">
              <h3 className="text-4xl font-semibold">Step 3: Submit LInks</h3>
              <p className="text-end text-2xl text-neutral-400">Copy the link of any Instagram Reel and paste it into our submission form.</p>
            </div>
            </div>
          <div className="bg-gray-600 w-30 h-30 rounded-full drop-shadow-xl top-[50em] absolute flex items-center justify-center p-2">
            <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
            <span className="material-symbols-outlined icon-lg">Category</span>
            </div>
            <div className="bg-neutral-950 w-[35em] h-40 absolute left-40 rounded-xl flex justify-center items-start flex-col p-4 gap-2 drop-shadow-xl">
              <h3 className="text-4xl font-semibold">Step 4: Auto-Categorize</h3>
              <p className="text-start text-2xl text-neutral-400">Our smart algorithm analyzes the reel to automatically assign relevent categories.</p>
            </div>
            </div>
          <div className="bg-gray-600 w-30 h-30 rounded-full drop-shadow-xl top-[65em] absolute flex items-center justify-center p-2">
            <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
            <span className="material-symbols-outlined icon-lg">Browse</span>
            </div>
            <div className="bg-neutral-950 w-[35em] h-40 absolute right-40 rounded-xl flex justify-center items-end flex-col p-4 gap-2 drop-shadow-xl">
              <h3 className="text-4xl font-semibold">Step 5: Browse & Filter</h3>
              <p className="text-end text-2xl text-neutral-400">Access your dashboard to browse, search, and filter your saved reels by category.</p>
            </div>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
