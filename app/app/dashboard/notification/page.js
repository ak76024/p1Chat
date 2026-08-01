"use client";

import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserPlus,
    FaUserCheck,
    FaCommentDots,
    FaCheckDouble,
    FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

const getIcon = (type) => {
    switch (type) {
        case "fr":
            return <FaUserPlus className="text-blue-400" />;

        case "fa":
            return <FaUserCheck className="text-green-400" />;

        case "msg":
            return <FaCommentDots className="text-yellow-400" />;

        case "grpinvite":
            return <FaUsers className="text-purple-400" />;

        default:
            return <FaBell className="text-indigo-400" />;
    }
};

const notificationText = {
    fr: "sent you a friend request.",
    fa: "accepted your friend request.",
    msg: "sent you a message.",
    grpinvite: "invited you to join a group.",
};

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [btnDisable, setbtnDisable] = useState(false)
    const fetchNotifications = async () => {
        try {
            const res = await fetch("/dashboard/api/fetchNotifications");
            const data = await res.json();
            setNotifications(data.notifications || []);
        } catch (err) {
            console.log(err);
            toast.error(err.message, { theme: "dark" });
        }
    };
    useEffect(() => {
        fetchNotifications();
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const isToday = (date) => {
        const d = new Date(date);
        const t = new Date();

        return d.toDateString() === t.toDateString();
    };

    const isYesterday = (date) => {
        const d = new Date(date);

        const y = new Date();
        y.setDate(y.getDate() - 1);

        return d.toDateString() === y.toDateString();
    };

    const today = notifications.filter((n) => isToday(n.createdAt));

    const yesterday = notifications.filter((n) =>
        isYesterday(n.createdAt)
    );

    const older = notifications.filter(
        (n) => !isToday(n.createdAt) && !isYesterday(n.createdAt)
    );

    const markAsRead = async (id) => {
        let loading = toast.loading("Marking as read...", { theme: "dark" });
        setbtnDisable(true)
        try {
            let req = await fetch("/dashboard/notification/api/read", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id,readone:true }),
            })
            let res = await req.json();
            if (res.success) {
                setNotifications((prev) =>
                    prev.map((item) =>
                        item._id === id ? { ...item, read: true } : item
                    )
                );
            } else {
                toast.error(res.message, { theme: "dark" });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { theme: "dark" });
        } finally {
            setbtnDisable(false)
            toast.dismiss(loading);
        }
    };

    const markAllAsRead = async () => {
        const ids = notifications
            .filter(item => !item.read)
            .map(item => item._id);

        let loading = toast.loading("Marking all as read...", { theme: "dark" });
        setbtnDisable(true)
        try {
            let req = await fetch("/dashboard/notification/api/read", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids, readone: false }),
            })
            let res = await req.json();
            if (res.success) {
                setNotifications((prev) =>
                    prev.map((item) =>
                        ids.includes(item._id) ? { ...item, read: true } : item
                    )
                );
            } else {
                toast.error(res.message, { theme: "dark" });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { theme: "dark" });
        } finally {
            setbtnDisable(false)
            toast.dismiss(loading);
        }
    };

    const acceptFriendReq = async (fId, nId, action) => {
        let loading = toast.loading("Accepting Friend Request...", { theme: "dark" });
        setbtnDisable(true)
        try {
            let req = await fetch("/dashboard/api/friendReq", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fId, nId, action: action }),
            })
            let res = await req.json();
            if (res.success) {
                toast.success(res.message, { theme: "dark" });
                setNotifications((prev) =>
                    prev.map((item) =>
                        item.friendReqId === fId
                            ? { ...item, read: true, friendshipStatus: action === "fReqAccept" ? "a" : "r" }
                            : item
                    )
                );
            } else {
                toast.error(res.message, { theme: "dark" });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { theme: "dark" });
        } finally {
            setbtnDisable(false)
            toast.dismiss(loading);
        }
    }

    const renderNotification = (item) => (
        <div
            key={item._id}
            className={`relative rounded-2xl border p-5 transition-all duration-200 hover:border-indigo-500
            ${!item.read
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-[#1b2334] border-slate-700"
                }`}
        >
            {!item.read && (
                <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-l-2xl" />
            )}

            <div className="flex justify-between items-center gap-5">

                <div className="flex gap-4">

                    {item.sender?.profilePicture ? (
                        <Link href={`/user/${item.sender.userName}`}>
                            <img
                                src={item.sender.profilePicture}
                                alt=""
                                className="w-14 h-14 rounded-full object-cover"
                            />
                        </Link>
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-[#24324b] flex items-center justify-center">
                            {getIcon(item.type)}
                        </div>
                    )}
                    <div>
                        <p className="text-gray-200">

                            <span className="font-semibold text-white">
                                {item.sender?.userName}
                            </span>{" "}

                            {item.msg ||
                                notificationText[item.type]}

                        </p>

                        <p className="text-sm text-gray-400 mt-2">
                            {`${new Date(item.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                            })} ${new Date(item.createdAt).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}`}
                        </p>

                        {!item.read && (
                            <button
                                disabled={btnDisable}
                                onClick={() =>
                                    markAsRead(item._id)
                                }
                                className="text-indigo-400 text-sm mt-3 cursor-pointer hover:text-indigo-300"
                            >
                                Mark as read
                            </button>
                        )}

                    </div>

                </div>

                {item.type === "fr" && item.friendshipStatus === "p" && (
                    <div className="flex gap-3 h-10">

                        <button disabled={btnDisable} onClick={() => acceptFriendReq(item.friendReqId?.toString(), item._id, "fReqAccept")} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg">
                            Accept
                        </button>

                        <button onClick={() => acceptFriendReq(item.friendReqId?.toString(), item._id, "fReqDecline")} disabled={btnDisable} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg">
                            Decline
                        </button>
                    </div>
                )}

            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#111827] text-white py-10 px-6">

            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <div className="flex gap-4 items-center">

                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                            <FaBell
                                size={24}
                                className="text-indigo-400"
                            />
                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">
                                Notifications
                            </h1>

                            <p className="text-gray-400 mt-1">
                                {unreadCount} unread
                                notification
                                {unreadCount !== 1 && "s"}
                            </p>

                        </div>

                    </div>

                    <button
                        disabled={btnDisable}
                        onClick={markAllAsRead}
                        className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl"
                    >
                        <FaCheckDouble />
                        Mark all as read
                    </button>

                </div>

                {notifications.length === 0 ? (
                    <div className="text-center py-32">

                        <FaBell
                            size={70}
                            className="mx-auto text-slate-600"
                        />

                        <h2 className="text-2xl font-semibold mt-6">
                            No Notifications
                        </h2>

                        <p className="text-gray-400 mt-2">
                            We'll notify you when something
                            happens.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-10">

                        {today.length > 0 && (
                            <div>

                                <h2 className="text-xl font-semibold mb-4">
                                    Today
                                </h2>

                                <div className="space-y-4">
                                    {today.map(renderNotification)}
                                </div>

                            </div>
                        )}

                        {yesterday.length > 0 && (
                            <div>

                                <h2 className="text-xl font-semibold mb-4">
                                    Yesterday
                                </h2>

                                <div className="space-y-4">
                                    {yesterday.map(
                                        renderNotification
                                    )}
                                </div>

                            </div>
                        )}

                        {older.length > 0 && (
                            <div>

                                <h2 className="text-xl font-semibold mb-4">
                                    Older
                                </h2>

                                <div className="space-y-4">
                                    {older.map(
                                        renderNotification
                                    )}
                                </div>

                            </div>
                        )}

                    </div>
                )}

            </div>

        </main>
    );
}