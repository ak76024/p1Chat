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