"use client";
import Sidebar from "./components/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const {status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 ml-65 overflow-y-auto p-2">
          {children}
        </main>
      </div>
    </div>
  );
}