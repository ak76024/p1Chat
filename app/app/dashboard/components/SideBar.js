import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import React from 'react'
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideBar = () => {
    const menu = [
        {
            title:"Home",
            icon:<FiHome/>,
            href:"/dashboard"
        },
        {
            title:"Messages",
            icon:<FiBell/>,
            href:"/dashboard/messages"
        },
        {
            title:"Users",
            icon:<FiUsers/>,
            href:"/dashboard/users"
        },
        {
            title:"Settings",
            icon:<FiSettings/>,
            href:"/dashboard/settings"
        }
    ]

    return (
        <aside className="w-64 h-screen fixed bg-gray-900 text-white flex flex-col">
            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                Dashboard
            </div>

            <nav className="flex-1 p-4 space-y-3">
                {menu.map((menu)=>(
                        <Link key={menu.title}
                            href={menu.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800"
                        >
                            {menu.icon}
                            {menu.title}
                        </Link>
                    ))
                }
            </nav>

            <div className="p-4 border-t border-gray-700">
                <button onClick={() => signOut()} type="button" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition">
                    <FiLogOut />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default SideBar