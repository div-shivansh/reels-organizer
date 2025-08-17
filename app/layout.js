import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/sessionWrapper";
import "./globalicons.css"
import { ToastContainer } from "react-toastify";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Reels Organizer",
  description: "save and Categorize instagram reels easily",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000"
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${workSans.className} antialiased`}
      >
        <SessionWrapper>
        <Navbar/>
        {children}
        <Footer/>
        </SessionWrapper>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

      </body>
    </html>
  );
}
