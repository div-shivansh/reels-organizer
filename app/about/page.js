"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-white">
          About Reels Organizer
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-8 text-gray-300">
            In a world where Instagram reels are a major source of entertainment, education,
            and inspiration, it becomes easy to lose track of your favorite ones.
            Reels Organizer was born to solve that — to provide a clean, simple,
            and personalized way to save and manage reels you love, without depending
            on Instagram's native tools or cluttered saved folders.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">What Is Reels Organizer?</h2>
          <p className="text-lg leading-8 text-gray-300">
            Reels Organizer is a web application that allows users to collect and organize
            their favorite Instagram reels in one centralized, private dashboard. Users can log
            in using Google Authentication, save reels with ease, and revisit or manage them
            anytime — without manually copying links or worrying about duplicates.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg leading-8">
            <li>Users sign in securely using Google authentication.</li>
            <li>They can submit Instagram reel links directly from the interface.</li>
            <li>The app scrapes essential details from the reel and stores it to the user's account.</li>
            <li>If a reel already exists in the database, it's linked to the new user to avoid duplication.</li>
            <li>Users can categorize, delete, or revisit saved reels from their dashboard.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
            <div className="bg-neutral-800 p-5 rounded-xl shadow-md">
              <strong className="block text-xl text-white mb-2">🔒 Secure Login</strong>
              Google Auth integration ensures your data is protected and access is easy.
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl shadow-md">
              <strong className="block text-xl text-white mb-2">📁 Reel Organization</strong>
              Easily save and manage reels, with automatic detection of duplicates.
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl shadow-md">
              <strong className="block text-xl text-white mb-2">⚡ Fast & Lightweight</strong>
              Built with Next.js and optimized MongoDB storage for smooth experience.
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl shadow-md">
              <strong className="block text-xl text-white mb-2">🌓 Clean Dark UI</strong>
              The interface is designed to be modern, minimal, and easy on the eyes.
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
          <p className="text-lg text-gray-300 leading-8">
            Reels Organizer is built using the latest technologies to ensure speed, scalability,
            and maintainability:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-lg leading-8 mt-3">
            <li>Next.js App Router with server & client components</li>
            <li>Tailwind CSS for styling</li>
            <li>MongoDB for database</li>
            <li>Vercel for deployment</li>
            <li>NextAuth.js for authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Made with ❤️ by Shivansh</h2>
          <p className="text-lg leading-8 text-gray-300">
            This project was created as a solution to a simple but common problem — managing
            your reel collection. If you're enjoying using this app or have feedback to make it
            better, feel free to connect with me or contribute to the GitHub repository!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
