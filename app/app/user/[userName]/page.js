"use client";
import { FaLink } from "react-icons/fa6";
import { FaSadTear } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
export default function ProfilePage() {
    const btnSty = "px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-95";
    const { status, data: session } = useSession();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();
    const params = useParams();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        function handleOutsideClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.info("You are not logged in.. Please Login....", {
                theme: "dark",
            });
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status !== "authenticated") return;

        fetch(`/user/api/user?userName=${params.userName}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.userfound) {
                    setProfile(data.user);
                } else {
                    toast.error(data.message, { theme: "dark" });
                    setProfile(null);
                }
            });
    }, [status, params.userName]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const addfriend = async () => {
        console.log(`sender: ${session.user.id}, receiver: ${profile._id}`);
        let loading = toast.loading("Sending Friend Request...", { theme: "dark" });
        try {
            const res = await fetch("/user/api/addfriend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: session.user.id,
                    receiver: profile._id,
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message, { theme: "dark" });
            } else {
                toast.error(data.message, { theme: "dark" });
            }
        } catch (error) {
            toast.error(`${error.message}`, { theme: "dark" });
        } finally {
            toast.dismiss(loading);
        }
    }

    const blockUser = () => { }

    return (
        <main className="min-h-screen bg-[#111827] text-white py-16 px-6">
            {profile ? (
                <div className="max-w-6xl mx-auto rounded-3xl bg-[#1b2334] border border-slate-700 shadow-2xl">

                    {/* Banner */}
                    <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600" />

                    {/* Body */}
                    <div className="px-10 pb-10">

                        {/* Avatar */}
                        <div className="-mt-24 flex flex-col lg:flex-row gap-10">

                            <div className="shrink-0">
                                <div
                                    className="w-52 h-52 rounded-full border-4 border-[#1b2334] shadow-2xl bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url("${profile.profilePicture || "/avatar.gif"}")`,
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 pt-20">

                                <h1 className="text-4xl font-bold">
                                    {profile.name}
                                </h1>

                                <p className="text-indigo-400 text-lg mt-1">
                                    @{profile.userName}
                                </p>

                                <p className="text-gray-400 mt-2">
                                    {profile.email}
                                </p>

                                {/* Stats */}

                                <div className="flex gap-8 mt-8">

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {profile.totalFriends}
                                        </h2>

                                        <p className="text-gray-400">
                                            Friends
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            Online
                                        </h2>

                                        <p className="text-gray-400">
                                            Status
                                        </p>
                                    </div>

                                </div>

                                {/* Bio */}

                                {profile.bio && (
                                    <div className="mt-8">

                                        <h3 className="font-semibold text-lg mb-2">
                                            About
                                        </h3>

                                        <p className="text-gray-300 leading-7">
                                            {profile.bio}
                                        </p>

                                    </div>
                                )}

                                {/* Website */}

                                {profile.website && (
                                    <a
                                        href={
                                            profile.website.startsWith("http")
                                                ? profile.website
                                                : `https://${profile.website}`
                                        }
                                        target="_blank"
                                        className="inline-flex items-center gap-2 mt-5 text-indigo-400 hover:text-indigo-300"
                                    >
                                        <FaLink />
                                        {profile.website}
                                    </a>
                                )}

                                {/* Buttons */}

                                <div className="flex gap-4 mt-10 items-center">
                                    {profile._id === session.user.id ? (
                                        <button
                                            onClick={() => router.push("/dashboard/editprofile")}
                                            className={btnSty}
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={addfriend} className={btnSty}>
                                                Add Friend
                                            </button>

                                            <button className={btnSty}>
                                                Message
                                            </button>

                                            {/* More Menu */}
                                            <div ref={menuRef} className="relative">
                                                <button
                                                    onClick={() => setShowMenu(!showMenu)}
                                                    className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
                                                >
                                                    <FiMoreVertical size={20} />
                                                </button>

                                                {showMenu && (
                                                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1f2937] border border-slate-700 shadow-xl overflow-hidden z-50">

                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(window.location.href);
                                                                setShowMenu(false);
                                                            }}
                                                            className="w-full px-4 py-3 text-left hover:bg-slate-700 transition"
                                                        >
                                                            Copy Profile Link
                                                        </button>

                                                        <button
                                                            className="w-full px-4 py-3 text-left hover:bg-slate-700 transition"
                                                        >
                                                            Report User
                                                        </button>

                                                        <button
                                                            onClick={blockUser}
                                                            className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition"
                                                        >
                                                            Block User
                                                        </button>

                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            ) : (
                <h1 className="flex justify-center items-center gap-3 text-3xl font-bold">
                    <FaSadTear />
                    User Not Found
                </h1>
            )}
        </main>
    );
}