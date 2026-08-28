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

import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <nav className='flex gap-4 justify-evenly px-10 py-5 bg-[#0754ac]'>
        <Link className='font-bold' href="/">Online Chat</Link>
        <Link className='text-2xl font-bold' href="https://www.instagram.com/ak76024" target="_blank">Ak76024</Link>
        <Link href="/login">Login</Link>
      </nav>
    </>
  )
}

export default page


// import React from "react";
// import Link from "next/link";

// const page = () => {
//   return (
//     <main className="min-h-screen bg-[#f5f8fc] text-gray-800">

//       {/* ================= NAVBAR ================= */}
//       <nav className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

//           <Link
//             href="/"
//             className="flex items-center gap-2"
//           >
//             <div className="w-9 h-9 rounded-lg bg-[#0754ac] text-white flex items-center justify-center font-bold">
//               💬
//             </div>

//             <span className="text-xl font-bold text-[#0754ac]">
//               Online Chat
//             </span>
//           </Link>

//           <div className="flex items-center gap-5 text-sm">

//             <Link
//               href="/login"
//               className="text-gray-600 hover:text-[#0754ac]"
//             >
//               Login
//             </Link>

//             <Link
//               href="/register"
//               className="bg-[#0754ac] hover:bg-[#06458e] text-white px-4 py-2 rounded-md"
//             >
//               Register
//             </Link>

//           </div>

//         </div>
//       </nav>


//       {/* ================= HERO ================= */}
//       <section className="bg-gradient-to-b from-[#eaf3ff] to-[#f5f8fc]">

//         <div className="max-w-6xl mx-auto px-5 py-14">

//           <div className="text-center mb-8">

//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//               Chat with people online
//             </h1>

//             <p className="text-gray-500 mt-3">
//               Meet new people, make friends and start a conversation.
//             </p>

//           </div>


//           {/* ================= CHAT CARD ================= */}
//           <div className="max-w-md mx-auto">

//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

//               {/* Card Header */}
//               <div className="bg-[#0754ac] text-white px-6 py-5 text-center">

//                 <h2 className="text-xl font-bold">
//                   Start Chatting
//                 </h2>

//                 <p className="text-blue-100 text-sm mt-1">
//                   Choose your details and join the chat
//                 </p>

//               </div>


//               {/* Form */}
//               <div className="p-6 space-y-5">

//                 {/* Username */}
//                 <div>

//                   <label className="block text-sm font-medium mb-2">
//                     Username
//                   </label>

//                   <input
//                     type="text"
//                     placeholder="Choose a username"
//                     className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#0754ac] focus:ring-1 focus:ring-[#0754ac]"
//                   />

//                 </div>


//                 {/* Gender */}
//                 <div>

//                   <label className="block text-sm font-medium mb-2">
//                     Gender
//                   </label>

//                   <div className="grid grid-cols-2 gap-3">

//                     <button className="border border-gray-300 rounded-md py-3 hover:border-[#0754ac] hover:bg-blue-50 transition">
//                       👨 Male
//                     </button>

//                     <button className="border border-gray-300 rounded-md py-3 hover:border-[#0754ac] hover:bg-blue-50 transition">
//                       👩 Female
//                     </button>

//                   </div>

//                 </div>


//                 {/* Age + Country */}
//                 <div className="grid grid-cols-2 gap-3">

//                   <div>

//                     <label className="block text-sm font-medium mb-2">
//                       Age
//                     </label>

//                     <select className="w-full border border-gray-300 rounded-md px-3 py-3 bg-white outline-none focus:border-[#0754ac]">
//                       <option>Select age</option>
//                       <option>18</option>
//                       <option>19</option>
//                       <option>20</option>
//                       <option>21</option>
//                       <option>22</option>
//                       <option>23</option>
//                       <option>24</option>
//                       <option>25+</option>
//                     </select>

//                   </div>


//                   <div>

//                     <label className="block text-sm font-medium mb-2">
//                       Country
//                     </label>

//                     <select className="w-full border border-gray-300 rounded-md px-3 py-3 bg-white outline-none focus:border-[#0754ac]">
//                       <option>Select country</option>
//                       <option>India</option>
//                       <option>USA</option>
//                       <option>UK</option>
//                       <option>Canada</option>
//                       <option>Australia</option>
//                     </select>

//                   </div>

//                 </div>


//                 {/* Start Button */}
//                 <Link
//                   href="/chat"
//                   className="block w-full text-center bg-[#0754ac] hover:bg-[#06458e] text-white font-semibold py-3 rounded-md transition"
//                 >
//                   Start Chat →
//                 </Link>


//                 <p className="text-center text-xs text-gray-400">
//                   By continuing, you agree to our terms and privacy policy.
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================= FEATURES ================= */}
//       <section className="bg-white border-y border-gray-200">

//         <div className="max-w-6xl mx-auto px-5 py-14">

//           <div className="text-center mb-10">

//             <h2 className="text-2xl md:text-3xl font-bold">
//               Why use Online Chat?
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Everything you need to enjoy simple online conversations.
//             </p>

//           </div>


//           <div className="grid md:grid-cols-3 gap-6">

//             {/* Feature 1 */}
//             <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

//               <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
//                 💬
//               </div>

//               <h3 className="font-bold text-lg mt-4">
//                 Easy Chat
//               </h3>

//               <p className="text-gray-500 text-sm mt-2 leading-relaxed">
//                 Start conversations quickly with a simple and
//                 easy-to-use chat interface.
//               </p>

//             </div>


//             {/* Feature 2 */}
//             <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

//               <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
//                 👥
//               </div>

//               <h3 className="font-bold text-lg mt-4">
//                 Meet People
//               </h3>

//               <p className="text-gray-500 text-sm mt-2 leading-relaxed">
//                 Connect with new people and make friends through
//                 online conversations.
//               </p>

//             </div>


//             {/* Feature 3 */}
//             <div className="text-center p-7 rounded-lg border border-gray-200 hover:shadow-md transition">

//               <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
//                 🌎
//               </div>

//               <h3 className="font-bold text-lg mt-4">
//                 Chat Anywhere
//               </h3>

//               <p className="text-gray-500 text-sm mt-2 leading-relaxed">
//                 Access your conversations from desktop, tablet
//                 or mobile devices.
//               </p>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================= CHAT ROOMS ================= */}
//       <section className="bg-[#f5f8fc]">

//         <div className="max-w-6xl mx-auto px-5 py-14">

//           <div className="text-center mb-10">

//             <h2 className="text-2xl md:text-3xl font-bold">
//               Popular Chat Rooms
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Join a room and start talking with others.
//             </p>

//           </div>


//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//             {[
//               ["🌎", "General Chat", "124 online"],
//               ["🎮", "Gaming", "86 online"],
//               ["🎵", "Music", "53 online"],
//               ["💻", "Technology", "41 online"],
//               ["⚽", "Sports", "38 online"],
//               ["🎬", "Movies", "62 online"],
//               ["📚", "Study", "29 online"],
//               ["😂", "Fun & Memes", "75 online"],
//             ].map(([icon, name, users]) => (

//               <Link
//                 href="/chat"
//                 key={name}
//                 className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#0754ac] hover:shadow-sm transition"
//               >

//                 <div className="text-2xl">
//                   {icon}
//                 </div>

//                 <h3 className="font-semibold mt-3">
//                   {name}
//                 </h3>

//                 <p className="text-green-600 text-xs mt-1">
//                   ● {users}
//                 </p>

//               </Link>

//             ))}

//           </div>

//         </div>

//       </section>


//       {/* ================= HOW IT WORKS ================= */}
//       <section className="bg-white">

//         <div className="max-w-5xl mx-auto px-5 py-14">

//           <div className="text-center mb-10">

//             <h2 className="text-2xl md:text-3xl font-bold">
//               How it works
//             </h2>

//           </div>


//           <div className="grid md:grid-cols-3 gap-8 text-center">

//             <div>

//               <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
//                 1
//               </div>

//               <h3 className="font-bold mt-4">
//                 Choose your username
//               </h3>

//               <p className="text-gray-500 text-sm mt-2">
//                 Pick a name that you want to use in the chat.
//               </p>

//             </div>


//             <div>

//               <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
//                 2
//               </div>

//               <h3 className="font-bold mt-4">
//                 Choose a chat room
//               </h3>

//               <p className="text-gray-500 text-sm mt-2">
//                 Find a room based on your interests.
//               </p>

//             </div>


//             <div>

//               <div className="w-12 h-12 mx-auto rounded-full bg-[#0754ac] text-white flex items-center justify-center font-bold text-lg">
//                 3
//               </div>

//               <h3 className="font-bold mt-4">
//                 Start talking
//               </h3>

//               <p className="text-gray-500 text-sm mt-2">
//                 Join the conversation and meet new people.
//               </p>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================= CTA ================= */}
//       <section className="bg-[#0754ac]">

//         <div className="max-w-5xl mx-auto px-5 py-14 text-center text-white">

//           <h2 className="text-2xl md:text-3xl font-bold">
//             Ready to start chatting?
//           </h2>

//           <p className="text-blue-100 mt-2">
//             Join a conversation and meet someone new today.
//           </p>

//           <Link
//             href="/chat"
//             className="inline-block mt-6 bg-white text-[#0754ac] font-bold px-7 py-3 rounded-md hover:bg-gray-100 transition"
//           >
//             Start Chatting
//           </Link>

//         </div>

//       </section>


//       {/* ================= FOOTER ================= */}
//       <footer className="bg-[#073b78] text-blue-100">

//         <div className="max-w-6xl mx-auto px-5 py-8">

//           <div className="flex flex-col md:flex-row justify-between gap-6">

//             <div>

//               <div className="flex items-center gap-2">
//                 <span className="text-xl">💬</span>
//                 <span className="font-bold text-white">
//                   Online Chat
//                 </span>
//               </div>

//               <p className="text-sm mt-2 max-w-sm">
//                 A simple place to connect, chat and make new
//                 friends online.
//               </p>

//             </div>


//             <div className="flex gap-6 text-sm">

//               <Link href="/" className="hover:text-white">
//                 Home
//               </Link>

//               <Link href="#features" className="hover:text-white">
//                 Features
//               </Link>

//               <Link href="/login" className="hover:text-white">
//                 Login
//               </Link>

//               <Link href="/register" className="hover:text-white">
//                 Register
//               </Link>

//             </div>

//           </div>


//           <div className="border-t border-blue-400/20 mt-7 pt-5 text-xs text-blue-200/70 text-center">
//             © 2026 Online Chat. All rights reserved.
//           </div>

//         </div>

//       </footer>

//     </main>
//   );
// };

// export default page;