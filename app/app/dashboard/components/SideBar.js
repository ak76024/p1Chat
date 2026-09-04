"use client"
import {FiHome,FiUsers,FiSettings,FiLogOut,FiBell,} from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { userNameContext } from "../context/context";
import { GiHidden } from "react-icons/gi";
const SideBar = ({props}) => {
    const {isOpen, setIsOpen} = props;
    const {userName} = React.useContext(userNameContext);
    const menu = [
        {
            title:"Home",
            icon:<FiHome/>,
            href:"/dashboard"
        },
        {
            title:"Notification",
            icon:<FiBell/>,
            href:"/dashboard/notification"
        },
        {
            title:"Messages",
            icon:<MdOutlineMessage />,
            href:"/dashboard/messages"
        },
        {
            title:"Users",
            icon:<FiUsers/>,
            href:"/dashboard/users"
        },
        {
            title:"Profile",
            icon:<CgProfile />,
            href:`/user/${userName}`
        },
        {
            title:"Settings",
            icon:<FiSettings/>,
            href:"/dashboard/settings"
        }
    ]

    return (
        <aside className={`w-64 h-screen fixed md:static ${isOpen? "block":"hidden"} bg-gray-900 text-white md:flex flex-col`}>
            <div className="text-2xl w-full flex items-center justify-between font-bold p-6 border-b border-gray-700">
                Dashboard
                <IoCloseSharp onClick={()=>setIsOpen(prev=>!prev)} className="md:hidden"/>
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