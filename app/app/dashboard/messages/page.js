"use client";
import { useState, useRef, useEffect } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";

function NullMsg(props) {
    const { setsearchUser } = props
    return (
        <div className="p-4 w-full h-full rounded flex flex-col justify-center items-center gap-3">
            <LuMessageSquareText className="text-7xl" />
            <h2 className="font-bold text-xl">Your messages</h2>
            <p>Send a message to start a chat.</p>
            <button onClick={() => setsearchUser(true)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-95">
                Send message
            </button>
        </div>
    );
}

function SearchUser(props) {
    const { setsearchUser } = props
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Akash Kumar",
            img: "/avatar.gif",
            userName: "ak76024",
        },
        {
            id: 2, name: "Akash Kumar", img: "/avatar.gif", userName: "ak76024",
        },
        { id: 3, name: "Akash Kumar", img: "/avatar.gif", userName: "ak76024", },
        { id: 4, name: "Akash Kumar", img: "/avatar.gif", userName: "ak76024", }
    ]);
    return (
        <div className="w-screen h-screen overflow-y-scroll bg-[#000000db] top-0 left-0 flex z-10 flex-col fixed justify-start p-10 items-center gap-5">
            <IoClose onClick={() => { setSearch(""); setsearchUser(false) }} className="absolute text-3xl top-5 right-10 text-white cursor-pointer" />
            <input type="text" placeholder="Search user..." className="bg-slate-800 w-1/3 text-white px-4 py-3 rounded-full outline-none" />
            <div className="flex flex-col items-center gap-3 w-1/2">
                {users.map((user) => (
                    <div key={user.id} className="flex gap-2 justify-start items-center bg-slate-800 rounded-full px-4 py-2 w-2/4 cursor-pointer">
                        <img src={user.img} alt="" className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center" />
                        <div>
                            <h1 className="text-lg font-semibold">{user.name}</h1>
                            <p className="text-gray-400">{user.userName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ChatBox() {
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
        }
    ]);

    const [text, setText] = useState("");
    const [newUser, setnewUser] = useState(true);

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
                    <div className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(/avatar.gif)`, }}></div>

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
            {!newUser && <div className="border-t border-slate-700 p-4">
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
            }
            {newUser && <div>
                <div className="border-t text-center border-slate-700 p-4">
                    <h1 className="font-bold">Accept message request from Akash</h1>
                    <p className="text-[#ffffff4f]">If you accept, they will also be able to call you and see info such as your activity status and when you've read messages.</p>
                </div>
                {/* now 3 button for block,delete,accept */}
                <div className="flex justify-between px-50 gap-3 mt-5">
                    <button className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full text-white font-semibold">Block</button>
                    <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-white font-semibold">Delete</button>
                    <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white font-semibold">Accept</button>
                </div>
            </div>
            }
        </div>
    );
}

function ChatList(props) {
    const { activeTab } = props;
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Akash Kumar",
            img: "/avatar.gif",
            msg: "ak76024",
        },
        {
            id: 2, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024",
        },
        { id: 3, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 4, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 5, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 6, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 7, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 8, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 9, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 10, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 11, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 12, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 13, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 14, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", },
        { id: 15, name: "Akash Kumar", img: "/avatar.gif", msg: "ak76024", }
    ]);
    const [showBox, setshowBox] = useState(null)

    return (
        <div className="w-[99%] h-[89vh] flex flex-col overflow-y-scroll">
            {users.map((user, index) => (
                <div onClick={() => alert('sdf')} key={index} className="cursor-pointer relative w-[96%] group px-5 py-3 hover:bg-[#ffffff10] rounded-full flex gap-3 items-center justify-between">
                    <img src={user.img} alt="" className="w-14" />
                    <div className="w-2/3">
                        <h1 className="text-lg font-semibold">{user.name}</h1>
                        <p className="text-gray-400">{user.msg}</p>
                    </div>
                    <BsThreeDots onClick={(e) => { e.stopPropagation(); setshowBox(showBox === user.id ? null : user.id) }} size={30} className="opacity-0 hover:bg-[#ffffff1e] rounded-lg text-gray-400 group-hover:opacity-100 transition-opacity duration-200" />
                    {showBox === user.id && <div className="absolute z-10 top-0 left-[60%] top-3/4 w-[40%] py-2 bg-[#0000006b] rounded-full flex items-center justify-center text-white">
                        <div className="flex gap-2 items-center bg-[#0000006b] w-[85%] justify-center py-3 rounded-full hover:text-xl duration-300 transition-all">
                            <MdDelete />
                            Delete
                        </div>
                    </div>
                    }
                </div>
            ))}
            {users.length === 0 && <div className="flex flex-col items-center justify-center gap-3 mt-10">
                    <LuMessageSquareText className="text-7xl" />
                    <h2 className="font-bold text-xl">No messages</h2>
                    <p>Send a message to start a chat.</p>
                </div>}
        </div>
    )
}

export default function message() {
    const [activeTab, setactiveTab] = useState("chats");
    const [showChat, setshowChat] = useState(false);
    const [searchUser, setsearchUser] = useState(false)

    return (
        <main className="flex w-full h-[98vh] gap-1">
            {searchUser && <SearchUser setsearchUser={setsearchUser} />}
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
                    <ChatList activeTab={activeTab} />
                </div>
            </section>
            <section className="w-2/3 h-full">
                {showChat ? <ChatBox /> : <NullMsg setsearchUser={setsearchUser} />}
            </section>
        </main>
    );
}