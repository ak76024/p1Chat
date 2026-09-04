"use client";

import { FiBell, FiMoon } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({setIsOpen}) {
  const [user, setuser] = useState(null);
  const [userName, setuserName] = useState(null);
  const [notification, setnotification] = useState(0)
  useEffect(() => {
    (async () => {
      let user = await fetch('/api/user');
      let { name, userName } = await user.json();
      setuser(name);
      setuserName(userName);
      let notificationNo = await fetch('/dashboard/api/notifications');
      let notifications = await notificationNo.json();
      setnotification(notifications.notifications);
    })()
  }, [])

  return (
    <header className="h-fit py-5 bg-slate-800 border-b border-slate-700 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome Back, {user} 👋
        </h1>

        <p className="text-gray-200 hidden md:block mt-2">
          Stay connected with your friends.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <Link href="/dashboard/notification" className="relative text-slate-300 hover:text-white transition">
          <FiBell size={22} />
          {notification > 0 && (
            <span className="absolute -top-2 -right-3 h-5 min-w-6 px-1 text-center rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
              {notification}
            </span>
          )}
        </Link>

        {/* Dark Mode */}
        <button className="text-slate-300 hover:text-white transition">
          <FiMoon size={22}/>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Link className="hidden md:block" href={`/user/${userName}`}>
            <h3 className="text-white font-semibold">{user?.split(" ")[0]}</h3>
            <p className="text-xs text-green-400">Online</p>
          </Link>
          {/* three bar for menu icon */}
          <IoMdMenu  onClick={()=> setIsOpen(prev=>!prev)} size={30} className="text-slate-300 block md:hidden"/>
        </div>
      </div>
    </header>
  );
}