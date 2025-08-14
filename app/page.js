"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <main className="bg-neutral-800">
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:min-h-[calc(100vh-72px)] min-h-[60vh] overflow-hidden bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] flex items-center md:justify-between justify-center md:sticky md:top-18">
        <div className="left w-full 2xl:px-40 xl:px-10 md:pl-3 px-2 md:px-0 flex justify-center md:items-start items-center flex-col sm:gap-6 gap-4 text-white">
          <h1 className="xl:text-7xl md:text-6xl sm:text-3xl text-2xl font-semibold xl:font-bold text-center md:text-start">
            Effortlessly Organize Your Instagram Reels
          </h1>
          <p className="xl:text-2xl text-neutral-100 md:text-start text-center sm:text-lg">
            The Ultimate Reels Organizer is here to declutter your saved content. Categorize, filter, and find your favourite reels in seconds.
          </p>
          <div className="buttons flex items-center sm:gap-7 gap-4 px-15">
            <a href="#steps"><motion.div
              variants={{
                tap: { backgroundColor: "white", transition: { duration: 0.1, ease: "easeOut" }}
              }}
              whileHover="hover"
              whileTap="tap"
              className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full sm:px-10 px-5 py-1.5 text-center border-2 border-white text-white bg-transparent hover:bg-white transition-all duration-200"
            >
              <motion.span
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: -40, transition: { duration: 0.1 } }
                }}
                transition={{ duration: 0.1 }}
                className="button-type font-semibold">Get Started</motion.span>
              <motion.div
                  initial={{ y: 40 }}
                variants={{
                  hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: 0, transition: { duration: 0.1 } }
                }}
                className="absolute inset-0 flex items-center justify-center">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Get Started</span>
              </motion.div>
            </motion.div></a>
            <Link href={"/about"}><motion.div
              variants={{
                tap: { backgroundColor: "white", transition: { duration: 0.1, ease: "easeOut" }}
              }}
              whileHover="hover"
              whileTap="tap"
              className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full sm:px-10 px-5 py-1.5 text-center border-2 border-white text-white bg-transparent hover:bg-white transition-all duration-200"
            >
              <motion.span
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: -40, transition: { duration: 0.1 } }
                }}
                transition={{ duration: 0.1 }}
                className="button-type font-semibold">About Us</motion.span>
              <motion.div
                  initial={{ y: 40 }}
                variants={{
                  hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: 0, transition: { duration: 0.1 } }
                }}
                className="absolute inset-0 flex items-center justify-center">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">About Us</span>
              </motion.div>
            </motion.div></Link>
          </div>
        </div>
        <div className="right hidden w-full md:flex items-center justify-center">
          <Image src={"/Landing.png"} priority width={855} height={744} alt="banner" className="w-full" />
        </div>
      </motion.section>
      <section id="steps" className="sticky bg-neutral-800 overflow-hidden">
        <motion.div
          initial={{
            opacity: 0, scale: 0.98
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white flex flex-col items-center p-2 lg:min-h-[96em] md:min-h-[95em] min-h-[121vh] h-fit">
          <h2 className="lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-semibold mt-10">How It Works</h2>
          <p className="text-gray-300 lg:text-xl lg:w-5/12 md:w-8/12 px-2 md:px-0 text-center mt-4">Organizing your favourite reels has never been easier. Follow these simple steps to get started.</p>
          <div className="steps flex flex-col md:items-center items-start justify-center mt-15 relative md:gap-0 gap-10 mb-15">

            <div className="w-1 lg:h-[77.5em] md:h-[76.2em] sm:h-[45.5em] h-[50em] bg-white rounded-full absolute md:top-0 xs:top-2 md:left-0 left-7.5"></div>


            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="flex items-center md:justify-center justify-between md:top-[5em] md:absolute md:gap-0 gap-2 cursor-default">
              <div className="bg-gray-600 lg:size-30 md:size-25 size-15  md:w-inherit rounded-full drop-shadow-xl flex items-center md:justify-center justify-between p-2">
                <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] size-full rounded-full">
                  <span className="material-symbols-outlined icon">Login</span>
                </div>
              </div>
              <div className="bg-neutral-950 xl:w-[33em] lg:w-[25em] md:w-[19em] sm:w-[30em] xs:w-[21em] w-[15em] lg:h-40 h-fit py-5 md:absolute lg:right-40 md:right-30 rounded-xl flex justify-center md:items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="xl:text-4xl lg:text-3xl xs:text-xl text-lg font-semibold">Step 1: Login</h3>
                <p className="md:text-end xl:text-2xl lg:text-xl xs:text-base text-sm text-neutral-400">Create an account or log in to start organizing your reels.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="flex items-center md:justify-center justify-between md:top-[20em] md:absolute md:gap-0 gap-2 cursor-default">
              <div className="bg-gray-600 lg:size-30 md:size-25 size-15  md:w-inherit rounded-full drop-shadow-xl flex items-center md:justify-center justify-between p-2">
                <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] size-full rounded-full">
                  <span className="material-symbols-outlined icon">Person_Add</span>
                </div>
              </div>
              <div className="bg-neutral-950 xl:w-[33em] lg:w-[25em] md:w-[19em] sm:w-[30em] xs:w-[21em] w-[15em] lg:h-40 h-fit py-5 md:absolute lg:left-40 md:left-30 rounded-xl flex justify-center md:items-start flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="xl:text-4xl lg:text-3xl xs:text-xl text-lg font-semibold">Step 2: Create Profile</h3>
                <p className="md:text-start xl:text-2xl lg:text-xl xs:text-base text-sm text-neutral-400">Personalize your experience by setting up your profile with your interests.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="flex items-center md:justify-center justify-between md:top-[35em] md:absolute md:gap-0 gap-2 cursor-default">
              <div className="bg-gray-600 lg:size-30 md:size-25 size-15  md:w-inherit rounded-full drop-shadow-xl flex items-center md:justify-center justify-between p-2">
                <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] size-full rounded-full">
                  <span className="material-symbols-outlined icon">Link</span>
                </div>
              </div>
              <div className="bg-neutral-950 xl:w-[33em] lg:w-[25em] md:w-[19em] sm:w-[30em] xs:w-[21em] w-[15em] lg:h-40 h-fit py-5 md:absolute lg:right-40 md:right-30 rounded-xl flex justify-center md:items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="xl:text-4xl lg:text-3xl xs:text-xl text-lg font-semibold">Step 3: Submit Links</h3>
                <p className="md:text-end xl:text-2xl lg:text-xl xs:text-base text-sm text-neutral-400">Copy the link of any Instagram Reel and paste it into our submission form.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="flex items-center md:justify-center justify-between md:top-[50em] md:absolute md:gap-0 gap-2 cursor-default">
              <div className="bg-gray-600 lg:size-30 md:size-25 size-15  md:w-inherit rounded-full drop-shadow-xl flex items-center md:justify-center justify-between p-2">
                <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] size-full rounded-full">
                  <span className="material-symbols-outlined icon">Category</span>
                </div>
              </div>
              <div className="bg-neutral-950 xl:w-[33em] lg:w-[25em] md:w-[19em] sm:w-[30em] xs:w-[21em] w-[15em] lg:h-40 h-fit py-5 md:absolute lg:left-40 md:left-30 rounded-xl flex justify-center md:items-start flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="xl:text-4xl lg:text-3xl xs:text-xl text-lg font-semibold">Step 4: Auto-Categorize</h3>
                <p className="md:text-start xl:text-2xl lg:text-xl xs:text-base text-sm text-neutral-400">Our smart algorithm analyzes the reel to automatically assign relevent categories.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="flex items-center md:justify-center justify-between md:top-[65em] md:absolute md:gap-0 gap-2 cursor-default">
              <div className="bg-gray-600 lg:size-30 md:size-25 size-15  md:w-inherit rounded-full drop-shadow-xl flex items-center md:justify-center justify-between p-2">
                <div className="flex items-center justify-center bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] size-full rounded-full">
                  <span className="material-symbols-outlined icon">Browse</span>
                </div>
              </div>
              <div className="bg-neutral-950 xl:w-[33em] lg:w-[25em] md:w-[19em] sm:w-[30em] xs:w-[21em] w-[15em] lg:h-40 h-fit py-5 md:absolute lg:right-40 md:right-30 rounded-xl flex justify-center md:items-end flex-col lg:p-4 p-3 gap-2 drop-shadow-xl">
                <h3 className="xl:text-4xl lg:text-3xl xs:text-xl text-lg font-semibold">Step 5: Browse & Filter</h3>
                <p className="md:text-end xl:text-2xl lg:text-xl xs:text-base text-sm text-neutral-400">Access your dashboard to browse, search, and filter your saved reels by category.</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>
    </main>
  );
}
