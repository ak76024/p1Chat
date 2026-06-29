"use client";
import { useState, useEffect, useRef } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Image from "next/image";

function NullMsg() {
    return (
        <div className="p-4 w-full h-full rounded flex flex-col justify-center items-center gap-3">
            <LuMessageSquareText className="text-7xl" />
            <h2 className="font-bold text-xl">Your messages</h2>
            <p>Send a message to start a chat.</p>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-95">
                Send message
            </button>
        </div>
    );
}

function ChatBox() {
    useEffect(() => {
        console.log("ChatBox Mounted");
    }, []);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! How are you?",
            sender: "other",
        },
        {
            id: 2,
            text: "I'm fine. How about you?",
            sender: "me",
        },
        {
            id: 3,
            text: "I'm doing great 😊",
            sender: "other",
        },
    ]);

    const [text, setText] = useState("");

    const messagesEndRef = useRef(null);

    // Auto Scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "auto",
        });
    }, [messages]);

    const sendMessage = () => {
        if (!text.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text,
                sender: "me",
            },
        ]);

        setText("");
    };

    return (
        <div className="h-[98vh] flex flex-col bg-[#1F2937]">

            {/* Header */}
            <nav className="h-16 border-b border-slate-700 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(/profile.png)", }}></div>

                    <div>
                        <h3 className="text-white font-semibold">Akash</h3>
                        <p className="text-green-400 text-sm">Online</p>
                    </div>
                </div>

                <IoMdInformationCircleOutline className="text-3xl text-white cursor-pointer" />
            </nav>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${msg.sender === "me"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >
                        {msg.sender === "other" && (
                            <div className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(/profile.png)", }}></div>
                        )}

                        <div
                            className={`px-4 py-2 rounded-2xl max-w-xs text-white ${msg.sender === "me"
                                ? "bg-indigo-600 rounded-br-md"
                                : "bg-slate-700 rounded-bl-md"
                                }`}
                        >
                            {msg.text}
                        </div>

                        {msg.sender === "me" && (
                            <div className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(/profile.png)", }}></div>

                        )}
                    </div>
                ))}

                {/* Scroll Target */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-700 p-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-full outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full text-white font-semibold"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function message() {
    const [activeTab, setactiveTab] = useState("chats");

    return (
        <main className="flex w-full h-[98vh] gap-1">
            <section className="w-1/3 h-full border-r border-gray-600">
                <div className="flex border-b border-gray-700">
                    <button
                        onClick={() => setactiveTab("chats")}
                        className={`flex-1 py-3 ${activeTab === "chats"
                            ? "border-b-2 border-white text-white"
                            : "text-gray-400"
                            }`}
                    >
                        Chats
                    </button>

                    <button
                        onClick={() => setactiveTab("requests")}
                        className={`flex-1 py-3 ${activeTab === "requests"
                            ? "border-b-2 border-white text-white"
                            : "text-gray-400"
                            }`}
                    >
                        Requests
                    </button>
                </div>

                <div className="mt-5">
                    {/* {activeTab === "chats" && <ChatList />} */}
                    {/* {activeTab === "requests" && <RequestList />} */}
                </div>
            </section>
            <section className="w-2/3 h-full">
                <NullMsg />
            </section>
        </main>
    );
}