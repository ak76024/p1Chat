"use client";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userNameContext } from "./context/context";

export default function DashboardLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();
  const [userName, setuserName] = useState()
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setuserName(data.userName);
      });
  }, [])
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.info("You are not logged in", { theme: "dark" });
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="w-screen h-screen bg-gray-800 text-white">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="min-h-screen flex text-white bg-gray-800">
      <userNameContext.Provider value={{ userName, setuserName }} >
        {/* Sidebar */}
        <Sidebar props={{ isOpen, setIsOpen }} />

        {/* Main Content */}
        <div className="flex h-screen flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-2">
            <div className="md:hidden block">
            <Navbar setIsOpen={setIsOpen}/>
            </div>
            {children}
          </main>
        </div>
      </userNameContext.Provider>
    </div>
  );
}