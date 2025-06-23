"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession()

  return (
    <main className="min-h-screen bg-neutral-800">
      <section className="h-[92.1vh] bg-red-900 flex items-center justify-between sticky top-[7.68vh]">
        <div className="left w-full px-40 flex justify-center flex-col gap-6">
          <h1 className="text-5xl font-bold text-white text-start">
            Effortlessly Organize Your Instagram Reels with the Ultimate Reels Organizer
          </h1>
          <p className="text-lg font-semibold text-gray-400 text-start">
            Tired of losing track of your favorite Instagram reels? Our tool lets<br /> you  save, categorize, and quickly find reels whenever you want. <br />
            Enjoy a seamless way to manage your reel collection and <br /> never miss out on inspiration again.
          </p>
          <div className="buttons flex items-center gap-7 px-15">
            {session && <Link href={"/profile"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border border-transparent bg-rose-600 text-white hover:bg-rose-800">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Profile</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold">Profile</span>
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
          <Image src={"/Banner.jpg"} width={2000} height={2000} alt="banner" className="h-[85vh] w-auto" />
        </div>
      </section>
      <section className="h-[92.1vh] bg-neutral-900 flex items-center justify-between sticky top-[7.68vh]">
        <div className="left w-full flex items-center justify-center">
          <Image src="/integration-banner.jpg" width={2000} height={2000} alt="Open Source Banner" className="h-[70vh] w-auto" />
        </div>
        <div className="right w-full px-40 flex flex-col gap-6 justify-center">
          <h2 className="text-4xl font-bold text-white text-start">
            Open Source & Community Driven
          </h2>
          <p className="text-lg font-semibold text-gray-400 text-start">
            This web app is fully open source! <br />
            We welcome contributions from everyone—whether you want to add features, fix bugs, or improve documentation.<br />
            Join our community and help make the Ultimate Reels Organizer even better.
          </p>

          <Link href={"/submission"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
            <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit your links</span>
            <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
              <span className="button-type font-semibold text-black">Submit your links</span>
            </div>
          </div></Link>

        </div>
      </section>
      <section className="h-[92.1vh] bg-gray-500 flex items-center justify-between sticky top-[7.8vh]">
        <div className="left w-full flex items-center justify-center">
          <Image src="/window.svg" width={1200} height={1200} alt="Open Source Banner" className="h-[70vh] w-auto" />
        </div>
        <div className="right w-full px-40 flex flex-col gap-6 justify-center">
          <h2 className="text-4xl font-bold text-white text-start">
            Open Source & Community Driven
          </h2>
          <p className="text-lg font-semibold text-gray-400 text-start">
            This web app is fully open source! <br />
            We welcome contributions from everyone—whether you want to add features, fix bugs, or improve documentation.<br />
            Join our community and help make the Ultimate Reels Organizer even better.
          </p>
          <div>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-2 bg-rose-600 text-white font-semibold hover:bg-rose-800 transition"
            >
              Contribute
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
