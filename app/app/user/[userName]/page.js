"use client";
import { FaLink } from "react-icons/fa6";
import { FaSadTear } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ProfilePage() {
    const btnSty = "px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-95";
    const params = useParams();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
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
    }, [])
    useEffect(() => {
        console.log(profile);
    }, [profile])


    return (
        <main className="w-screen min-h-screen bg-[#111827] text-white py-15">
            <div className="w-full h-full flex items-center justify-center gap-4 px-5">
                {profile && <><div className="w-1/2">
                    <div
                    className="m-auto"
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundImage: `url("${profile.profilePicture}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                </div>
                    <div className="w-1/2 flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">
                            {profile.userName}
                        </h1>

                        <p className="text-xl text-gray-300">
                            {profile.name}
                        </p>

                        <p className="text-gray-400">
                            {profile.email}
                        </p>

                        <p><span className="font-bold">{profile.totalFriends}</span> Friends | <span className="font-bold">{profile.totalFollowers}</span> Followers | <span className="font-bold">{profile.totalFollowing}</span> Following</p>

                        <p>{profile.bio}</p>
                        {profile.website && <a href={profile.website?.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" className="flex gap-2 items-center"><FaLink /><span style={{ color: "#166bdf" }}>{profile.website}</span></a>}

                        <div className="flex w-full gap-3 self-start">
                            <button className={btnSty}>
                                Send message
                            </button>
                            <button className={btnSty}>
                                Add Friend
                            </button>
                        </div>
                    </div></>}
                {!profile && <h1 className="text-3xl flex items-center gap-4 font-bold"><FaSadTear />User Not Found</h1>}
            </div>
        </main >
    );
}