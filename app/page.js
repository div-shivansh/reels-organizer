"use client"
import Image from "next/image";
import Link from "next/link";
import { motion, MotionValue, useScroll, useSpring, useTransform, } from "motion/react"
import { useRef } from "react";

export default function Home() {

  return (
    <main className="min-h-[86vh] bg-neutral-800">
      <motion.section
        initial={{
          opacity: 0, scale: 0.98
        }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{duration: 0.5, ease: "easeInOut"}}
        className="lg:min-h-[86vh] min-h-[60vh] bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] flex items-center justify-between sticky top-[7.8vh]">
        <div className="left w-full lg:px-40 md:pl-3 px-2 md:px-0 flex justify-center md:items-start items-center flex-col gap-6 text-white">
          <h1 className="lg:text-7xl md:text-6xl text-3xl font-semibold lg:font-bold text-center md:text-start">
            Effortlessly Organize Your Instagram Reels
          </h1>
          <p className="lg:text-2xl md:text-xl text-neutral-100 md:text-start text-center text-lg">
            The Ultimate Reels Organizer is here to declutter your saved content. Categorize, filter, and find your favourite reels in seconds.
          </p>
          <div className="buttons flex items-center gap-7 px-15">
            <a href="#steps"><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent  text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Get Started</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Get Started</span>
              </div>
            </div></a>
            <Link href={"/about"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">About Us</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">About Us</span>
              </div>
            </div></Link>
          </div>
        </div>
        <div className="right hidden w-full md:flex items-center justify-center">
          <Image src={"/Landing.png"} priority width={855} height={744} alt="banner" className="w-full" />
        </div>
      </motion.section>
      <section id="steps" className="sticky bg-neutral-800">
        <motion.div
        initial={{
          opacity: 0, scale: 0.98
        }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{duration: 0.5, ease: "easeInOut"}}
         className="text-white flex flex-col items-center p-2 lg:min-h-[165vh] min-h-[132vh]">
          <h2 className="lg:text-7xl text-5xl font-semibold mt-10">How It Works</h2>
          <p className="text-gray-300 lg:text-xl text-lg lg:w-5/12 w-8/12 text-center mt-4">Organizing your favourite reels has never been easier. Follow these simple steps to get started.</p>
          <div className="steps flex flex-col items-center justify-center mt-15 relative">
            <div className="w-1 h-[77.5em] bg-white rounded-full"></div>
            <div className="bg-gray-600 lg:size-30 size-25 rounded-full drop-shadow-xl lg:top-[5em] top-[5em] absolute flex items-center justify-center p-2">
              <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
                <span className="material-symbols-outlined icon-lg">Login</span>
              </div>
              <div className="bg-neutral-950 lg:w-[35em] w-[20em] lg:h-40 h-fit py-5 absolute lg:right-40 right-30 rounded-xl flex justify-center items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="lg:text-4xl text-2xl font-semibold">Step 1: Login</h3>
                <p className="text-end lg:text-2xl text-lg text-neutral-400">Create an account or log in to start organizing your reels.</p>
              </div>
            </div>
            <div className="bg-gray-600 lg:size-30 size-25 rounded-full drop-shadow-xl lg:top-[20em] top-[20em] absolute flex items-center justify-center p-2">
              <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
                <span className="material-symbols-outlined icon-lg">Person_Add</span>
              </div>
              <div className="bg-neutral-950 lg:w-[35em] w-[20em] lg:h-40 h-fit py-5 absolute lg:left-40 left-30 rounded-xl flex justify-center items-start flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="lg:text-4xl text-2xl font-semibold">Step 2: Create Profile</h3>
                <p className="text-start lg:text-2xl text-lg text-neutral-400">Personalize your experience by setting up your profile with your interests.</p>
              </div>
            </div>
            <div className="bg-gray-600 lg:size-30 size-25 rounded-full drop-shadow-xl lg:top-[35em] top-[35em] absolute flex items-center justify-center p-2">
              <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
                <span className="material-symbols-outlined icon-lg">Link</span>
              </div>
              <div className="bg-neutral-950 lg:w-[35em] w-[20em] lg:h-40 h-fit py-5 absolute lg:right-40 right-30 rounded-xl flex justify-center items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="lg:text-4xl text-2xl font-semibold">Step 3: Submit Links</h3>
                <p className="text-end lg:text-2xl text-lg text-neutral-400">Copy the link of any Instagram Reel and paste it into our submission form.</p>
              </div>
            </div>
            <div className="bg-gray-600 lg:size-30 size-25 rounded-full drop-shadow-xl lg:top-[50em] top-[50em] absolute flex items-center justify-center p-2">
              <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
                <span className="material-symbols-outlined icon-lg">Category</span>
              </div>
              <div className="bg-neutral-950 lg:w-[35em] w-[20em] lg:h-40 h-fit py-5 absolute lg:left-40 left-30 rounded-xl flex justify-center items-start flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="lg:text-4xl text-2xl font-semibold">Step 4: Auto-Categorize</h3>
                <p className="text-start lg:text-2xl text-lg text-neutral-400">Our smart algorithm analyzes the reel to automatically assign relevent categories.</p>
              </div>
            </div>
            <div className="bg-gray-600 lg:size-30 size-25 rounded-full drop-shadow-xl lg:top-[65em] top-[65em] absolute flex items-center justify-center p-2">
              <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] w-full h-full rounded-full">
                <span className="material-symbols-outlined icon-lg">Browse</span>
              </div>
              <div className="bg-neutral-950 lg:w-[35em] w-[20em] lg:h-40 h-fit py-5 absolute lg:right-40 right-30 rounded-xl flex justify-center items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="lg:text-4xl text-2xl font-semibold">Step 5: Browse & Filter</h3>
                <p className="text-end lg:text-2xl text-lg text-neutral-400">Access your dashboard to browse, search, and filter your saved reels by category.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
