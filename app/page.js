"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession()

  return (
    <main className="min-h-[86vh] bg-neutral-800">
      <section className="h-[86vh] bg-red-900 flex items-center justify-between">
        <div className="left w-full px-40 flex justify-center flex-col gap-6">
          <h1 className="text-5xl font-bold text-white text-start">
            Effortlessly Organize Your Instagram Reels with the Ultimate Reels Organizer
          </h1>
          <p className="text-lg font-semibold text-gray-400 text-start">
            Tired of losing track of your favorite Instagram reels? Our tool lets<br /> you  save, categorize, and quickly find reels whenever you want. <br />
            Enjoy a seamless way to manage your reel collection and <br /> never miss out on inspiration again.
          </p>
          <div className="buttons flex items-center gap-7 px-15">
            {session && <Link href={"/submission"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border border-transparent bg-rose-600 text-white hover:bg-rose-800">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit Links</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold">Submit Links</span>
              </div>
            </div></Link>}
            {!session && 
            <Link href={"/login"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border border-transparent bg-rose-600 text-white hover:bg-rose-800">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Login</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold">Login</span>
              </div>
            </div></Link>}
            <Link href={"/dashboard"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Dashboard</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-black">Dashboard</span>
              </div>
            </div></Link>
          </div>
        </div>
        <div className="right w-full flex items-center justify-center">
          <Image src={"/Landing.png"} priority width={855} height={744} alt="banner" className="h-[85vh] w-auto" />
        </div>
      </section>
    </main>
  );
}
