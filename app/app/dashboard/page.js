"use client";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <h1 className="text-3xl font-bold">
          Welcome Back, {session.user.name} 👋
        </h1>

        <p className="text-gray-200 mt-2">
          Stay connected with your friends.
        </p>
        <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Unread Messages",
              value: "12",
            },
            {
              title: "Friends Online",
              value: "8",
            },
            {
              title: "Groups",
              value: "5",
            },
            {
              title: "Friend Requests",
              value: "2",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-gray-600 rounded-xl shadow p-6"
            >
              <p className="text-gray-100">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Chats */}
          <div className="bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-5">
              Recent Chats
            </h2>

            <div className="space-y-5">
              {[
                {
                  name: "Rahul",
                  msg: "Hey bro 👋",
                  time: "2 min ago",
                },
                {
                  name: "Priya",
                  msg: "Let's meet tomorrow.",
                  time: "15 min ago",
                },
                {
                  name: "Aman",
                  msg: "😂😂😂",
                  time: "1 hour ago",
                },
              ].map((chat) => (
                <div
                  key={chat.name}
                  className="flex justify-between items-center border-b border-gray-600 pb-3"
                >
                  <div>
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {chat.msg}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {chat.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Online Friends */}
          <div className="bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-5">
              Online Friends
            </h2>

            <div className="space-y-4">
              {["Rahul", "Aman", "Priya", "Neha"].map((user) => (
                <div
                  key={user}
                  className="flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Friend Requests */}
          <div className="bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-5">
              Friend Requests
            </h2>

            <div className="flex justify-between items-center">
              <span>John sent you a request.</span>

              <div className="flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                  Accept
                </button>

                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-5">
              Notifications
            </h2>

            <div className="space-y-3 text-gray-300">
              <p>❤️ Rahul reacted to your message.</p>
              <p>📷 Priya sent an image.</p>
              <p>👥 Aman created a new group.</p>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}