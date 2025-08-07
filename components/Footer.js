'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", icon: "Home", href: "/" },
    { name: "Submit", icon: "Link", href: "/submission" },
    { name: "Dashboard", icon: "Browse", href: "/dashboard" },
    { name: "Profile", icon: "Person", href: "/profile" },
    { name: "About Us", icon: "Group", href: "/about" },
  ]

  return (
    <>
      <footer className='bg-black text-white flex items-center justify-center py-4'>
        <span>For Feedback DM on <Link href={"https://instagram.com/div.shivansh"} target='_blank'>@div.shivansh</Link></span>
      </footer>
      <nav className='bg-black text-white md:hidden flex items-center justify-between p-1 sm:px-4 h-16 sticky bottom-0'>
        {navItems.map(({ name, icon, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link key={href} href={href} className={`flex items-center justify-center flex-col ${isActive ? 'bg-white text-black rounded-xl p-0.5 sm:px-4 px-2' : 'text-white'}`}>
              <span className='material-symbols-outlined icon'>{icon}</span>
              <span className='sm:text-xl xs:text-lg 3xs:text-sm 3xs:font-light'>{name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Footer
