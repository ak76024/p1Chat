"use client";
import { FaLink } from "react-icons/fa6";
import { FaSadTear } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
export default function ProfilePage() {
    const btnSty = "px-6 py-3 cursor-pointer disabled:cursor-not-allowed rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-95";
    const [btnDisable, setbtnDisable] = useState(false)
    const [btnAction, setbtnAction] = useState({ showPopup: false, action: "", })
    const { status, data: session } = useSession();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const fethUser = () => {
        fetch(`/user/api/user?userName=${params.userName}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.userfound) {
                    setProfile(data.user);
                } else {
                    toast.error(data.message, { theme: "dark" });
                    setProfile(null);
                }
            })
    }

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
        fethUser();
    }, [status, params.userName]);

    if (status === "loading") {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#111827] text-white overflow-hidden">

                {/* Background Glow */}
                <div className="absolute h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />

                {/* Logo */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-20 w-20 rounded-full border-4 border-indigo-500/20"></div>

                    <div className="h-20 w-20 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>

                    <div className="absolute text-2xl font-bold">
                        A
                    </div>
                </div>

                {/* Title */}
                <h1 className="mt-8 text-2xl font-bold tracking-wide">
                    Loading Profile
                </h1>

                <p className="mt-2 text-gray-400">
                    Please wait...
                </p>

                {/* Loading Bar */}
                <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-indigo-500"></div>
                </div>

            </div>
        );
    }

    const addfriend = async () => {
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
            fethUser();
        }
    }

    const removerFirend = async () => {
        setbtnAction({ showPopup: false, action: "", });
        let loading = toast.loading("Removing Friend...", { theme: "dark" });
        setbtnDisable(true);
        try {
            const res = await fetch("/user/api/removeFriend", {
                method: "DELETE",
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
                fethUser();
            } else {
                toast.error(data.message, { theme: "dark" });
            }
        } catch (error) {
            toast.error(`${error.message}`, { theme: "dark" });
        } finally {
            toast.dismiss(loading);
            setbtnDisable(false);
        }
    }

    const blockUser = () => { alert("Block User") }

    const handleconfirm = () => {
        switch (btnAction.action) {
            case "removefriend":
                removerFirend();
                break;
            case "blockuser":
                blockUser();
                break;
            case "cancelFriendReq":
                removerFirend();
                break;
            default:
                break;
        }
        setbtnAction({ showPopup: false, action: "", });
    }

    const acceptfriendreq = async (fId, nId) => {
        console.log(fId, nId);
        setbtnDisable(true);
        let loading = toast.loading("Accepting Friend Request...", { theme: "dark" });
        try {
            const res = await fetch("/dashboard/api/friendReq", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fId,
                    nId,
                    action: "fReqAccept",
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message, { theme: "dark" });
                fethUser();
            } else {
                toast.error(data.message, { theme: "dark" });
            }
        } catch (error) {
            toast.error(`${error.message}`, { theme: "dark" });
        } finally {
            toast.dismiss(loading);
            setbtnDisable(false);
        }
    }

    return (
        <main className="min-h-screen relative bg-[#111827] text-white py-16 px-6">
            {btnAction.showPopup && (
                <div className="fixed right-0 inset-0 z-50 flex items-center justify-center bg-[#00000070] backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#1b2334] p-6 shadow-2xl">

                        <h2 className="text-2xl font-bold text-white">
                            Confirm Action
                        </h2>

                        <p className="mt-3 text-gray-300">
                            {btnAction.action === "removefriend" ? "Are you sure you want to remove this user from your friend list?" : btnAction.action === "blockuser" ? "Are you sure you want to block this user?" : ""}
                            {btnAction.action === "cancelFriendReq" && "Are you sure you want to cancel this friend request?"}
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setbtnAction({ showPopup: false, action: "", })}
                                className="rounded-lg border border-slate-600 px-8 py-2 text-white hover:bg-slate-700 transition"
                            >
                                Cancel
                            </button>

                            <button onClick={handleconfirm} className="rounded-lg bg-red-600 px-8 py-2 font-semibold text-white hover:bg-red-700 transition">
                                Confirm
                            </button>
                        </div>

                    </div>
                </div>
            )}
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
                            <div className="flex-1 md:pt-20 ">

                                <div className="flex gap-10">
                                    <h1 className="text-4xl font-bold">
                                        {profile.name}
                                    </h1>
                                    <div ref={menuRef} className="relative">
                                        <button disabled={btnDisable}
                                            onClick={() => setShowMenu(!showMenu)}
                                            className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
                                        >
                                            <FiMoreVertical size={20} />
                                        </button>

                                        {showMenu && (
                                            <div className="absolute mt-2 -right-[120%] w-48 rounded-xl bg-[#1f2937] border border-slate-700 shadow-xl overflow-hidden z-50">
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(window.location.href);
                                                        setShowMenu(false);
                                                        toast.success("Copied to clipboard", { theme: "dark" });
                                                    }}
                                                    className="w-full px-4 py-3 text-left hover:bg-slate-700 transition"
                                                >
                                                    Copy Profile Link
                                                </button>

                                                {profile.friend.status === "a" &&
                                                    <button disabled={btnDisable} onClick={() => { setShowMenu(false); setbtnAction({ showPopup: true, action: "removefriend" }) }} className="w-full px-4 py-3 text-left hover:bg-slate-700 transition">
                                                        Remove Friend
                                                    </button>}
                                                {!profile.self && (<>
                                                    <button disabled={btnDisable}
                                                        className="w-full px-4 py-3 text-left hover:bg-slate-700 transition"
                                                    >
                                                        Report User
                                                    </button>
                                                    <button disabled={btnDisable}
                                                        onClick={blockUser}
                                                        className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition"
                                                    >
                                                        Block User
                                                    </button></>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-indigo-400 text-lg mt-1">
                                    @{profile.userName}
                                </p>

                                <p className="text-gray-400 mt-2">
                                    {profile.email}
                                </p>

                                {/* Stats */}

                                <div className="flex gap-8 mt-8">

                                    <div className="cursor-pointer">
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

                                <div className="flex gap-4 mt-10 items-start">
                                    {profile._id === session.user.id ? (
                                        <button
                                            onClick={() => router.push("/dashboard/editprofile")}
                                            className={btnSty}
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <>
                                            {!profile.friend.status &&
                                                <button disabled={btnDisable} onClick={addfriend} className={btnSty}>
                                                    Add Friend
                                                </button>
                                            }
                                            {profile.friend.status === "pending" && profile.friend.sender === session.user.id &&
                                                <button disabled={btnDisable} onClick={() => { setShowMenu(false); setbtnAction({ showPopup: true, action: "cancelFriendReq" }) }} className={btnSty}>
                                                    Cancel Friend Request
                                                </button>}
                                            {profile.friend.status === "pending" && profile.friend.receiver === session.user.id &&
                                                <button onClick={() => acceptfriendreq(profile.friend.friendReqId, profile.friend.notificationId)} disabled={btnDisable} className={btnSty}>
                                                    Accept Friend Request
                                                </button>
                                            }

                                            <button disabled={btnDisable} className={btnSty}>
                                                Message
                                            </button>
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