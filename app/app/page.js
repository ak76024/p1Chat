// "use client";

// import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// export default function Home() {
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:3100");

//     socketRef.current.on("connect", () => {
//       console.log("Connected");
//     });

//     socketRef.current.on("message", (msg) => {
//       console.log(msg);
//     });

//     return () => socketRef.current.disconnect();
//   }, []);

//   return (
//     <button
//       onClick={() => socketRef.current.emit("message", "Hello")}
//     >
//       Send
//     </button>
//   );
// }

import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#f5f8fc] text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#00000041] flex justify-between gap-2 items-center md:flex-row flex-col border-b p-3 border-gray-200">
        <div className="max-w-6xl w-full md:w-1/3 mx-auto md:mx-0 px-5 gap-4 py-1 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0754ac] text-white flex items-center justify-center font-bold">
              💬
            </div>

            <span className="text-xl font-bold text-[#0754ac]">
              Online Chat
            </span>
          </Link>

          <Link
            href="https://www.instagram.com/ak76024"
            target="_blank"
            className="text-gray-600 flex items-center justify-center gap-3 hover:text-[#0754ac]"
          >
            <div className="w-9 h-9 rounded-lg text-white flex items-center justify-center font-bold">
              <img src="/favicon.ico" alt="" />
            </div>

            <span className="text-xl font-bold text-[#0754ac]">
              Ak76024
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-5 text-sm">

          <Link
            href="/login"
            className="bg-[#0754ac] hover:bg-[#06458e] text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#0754ac] hover:bg-[#06458e] text-white px-4 py-2 rounded-md"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="bg-[#100f0f15]">

        <div className="max-w-6xl mx-auto px-5 py-14">

          <div className="text-center mb-8">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Chat with people online
            </h1>

            <p className="text-gray-500 mt-3">
              Meet new people, make friends and start a conversation.
            </p>

          </div>


          {/* ================= CHAT CARD ================= */}
          {/* ================= CHAT CARD ================= */}
          <div className="max-w-md mx-auto">

            <div className="bg-[#0e0d0d04] rounded-xl shadow-xl border border-gray-200 overflow-hidden">

              {/* Card Header */}
              <div className="bg-[#0754ac] text-white px-6 py-5 text-center">

                <h2 className="text-xl font-bold">
                  Start Chatting
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                  Sign in to meet and chat with people online
                </p>

              </div>

              {/* Card Body */}
              <div className="p-6">

                <p className="text-center text-gray-600 text-sm mb-6">
                  Create an account or sign in to start chatting with people online.
                </p>

                <div className="space-y-3">

                  <Link
                    href="/login"
                    className="block w-full text-center bg-[#0754ac] hover:bg-[#06458e] text-white font-semibold py-3 rounded-md transition"
                  >
                    Sign In →
                  </Link>

                  <Link
                    href="/signup"
                    className="block w-full text-center border border-[#0754ac] text-[#0754ac] hover:bg-blue-50 font-semibold py-3 rounded-md transition"
                  >
                    Create Account
                  </Link>

                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                  Your account is required to use the chat.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-[#0808081b] border-y border-gray-200">

        <div className="max-w-6xl mx-auto px-5 py-14">

          <div className="text-center mb-10">

            <h2 className="text-2xl md:text-3xl font-bold">
              Why use Online Chat?
            </h2>

            <p className="text-gray-500 mt-2">
              Everything you need to enjoy simple online conversations.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                💬
              </div>

              <h3 className="font-bold text-lg mt-4">
                Easy Chat
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Start conversations quickly with a simple and
                easy-to-use chat interface.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                👥
              </div>

              <h3 className="font-bold text-lg mt-4">
                Meet People
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Connect with new people and make friends through
                online conversations.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                🌎
              </div>

              <h3 className="font-bold text-lg mt-4">
                Chat Anywhere
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Access your conversations from desktop, tablet
                or mobile devices.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CHAT ROOMS ================= */}
      <section className="bg-[#0a0a0a2a]">

        <div className="max-w-6xl mx-auto px-5 py-14">

          <div className="text-center mb-10">

            <h2 className="text-2xl md:text-3xl font-bold">
              Popular Chat Rooms
            </h2>

            <p className="text-gray-500 mt-2">
              Join a room and start talking with others.
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              ["🌎", "General Chat", "124 online"],
              ["🎮", "Gaming", "86 online"],
              ["🎵", "Music", "53 online"],
              ["💻", "Technology", "41 online"],
              ["⚽", "Sports", "38 online"],
              ["🎬", "Movies", "62 online"],
              ["📚", "Study", "29 online"],
              ["😂", "Fun & Memes", "75 online"],
            ].map(([icon, name, users]) => (

              <Link
                href="/chat"
                key={name}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#0754ac] hover:shadow-sm transition"
              >

                <div className="text-2xl">
                  {icon}
                </div>

                <h3 className="font-semibold mt-3">
                  {name}
                </h3>

                <p className="text-green-600 text-xs mt-1">
                  ● {users}
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-[#08070716]">

        <div className="max-w-5xl mx-auto px-5 py-14">

          <div className="text-center mb-10">

            <h2 className="text-2xl md:text-3xl font-bold">
              How it works
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
                1
              </div>

              <h3 className="font-bold mt-4">
                Choose your username
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Pick a name that you want to use in the chat.
              </p>

            </div>


            <div>

              <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
                2
              </div>

              <h3 className="font-bold mt-4">
                Choose a chat room
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Find a room based on your interests.
              </p>

            </div>


            <div>

              <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
                3
              </div>

              <h3 className="font-bold mt-4">
                Start talking
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Join the conversation and meet new people.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="bg-[#0754ac]">

        <div className="max-w-5xl mx-auto px-5 py-14 text-center text-white">

          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to start chatting?
          </h2>

          <p className="text-blue-100 mt-2">
            Join a conversation and meet someone new today.
          </p>

          <Link
            href="/signup"
            className="inline-block mt-6 bg-white text-[#0754ac] font-bold px-7 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-[#073b78] text-blue-100">

        <div className="max-w-6xl mx-auto px-5 py-8">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>

              <div className="flex items-center gap-2">
                <span className="text-xl">💬</span>
                <span className="font-bold text-white">
                  Online Chat
                </span>
              </div>

              <p className="text-sm mt-2 max-w-sm">
                A simple place to connect, chat and make new
                friends online.
              </p>

            </div>


            <div className="flex gap-6 text-sm">

              <Link href="/" className="hover:text-white">
                Home
              </Link>

              <Link href="#features" className="hover:text-white">
                Features
              </Link>

              <Link href="/login" className="hover:text-white">
                Login
              </Link>

              <Link href="/register" className="hover:text-white">
                Register
              </Link>

            </div>

          </div>


          <div className="border-t border-blue-400/20 mt-7 pt-5 text-xs text-blue-200/70 text-center">
            © 2026 Online Chat. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
};

export default page;