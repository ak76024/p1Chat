"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function UsersPage() {
  const [users, setusers] = useState([]);

  const searchUser = async (e) => {
    let search = e.target.value;
    search = search.trim();
    if (!search) {
      setusers([]);
      return;
    }
    const req = await fetch(`/api/searchUser?search=${search}`);
    const data = await req.json();
    if(!data.searchUser){
      setusers([]);
      toast.error(data.message,{theme:"dark"});
      return
    }
    setusers(data.user);
  }

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      {/* Search */}
      <div className="relative mb-8">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          onChange={searchUser}
          type="text"
          placeholder="Search users..."
          className="w-full bg-slate-800 rounded-xl pl-11 pr-4 py-3 outline-none border border-slate-700"
        />
      </div>

      {/* Users */}
      <div className="space-y-4">

        {users.map((user) => (
          <div
            key={user.userName}
            onClick={()=>redirect(`/user/${user.userName}`)}
            className="bg-slate-800 cursor-pointer rounded-xl p-5 flex justify-between items-center hover:bg-slate-700 transition"
          >
            <div className="flex items-center gap-4">

              <div className="relative">
                <img
                  src={user.profilePicture}
                  className="w-14 h-14 rounded-full"
                />

                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${user.status === "online"
                    ? "bg-green-500"
                    : "bg-gray-500"
                    }`}
                ></span>
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {user.userName}
                </h2>

                <p className="text-gray-400 text-sm">
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>

    </main>
  );
}