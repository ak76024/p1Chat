"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userNameContext } from "../context/context";

export default function EditProfile() {
    const { setuserName } = React.useContext(userNameContext);
    const [profile, setProfile] = useState({});
    const fetchDataAndSet = () => {
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
            });
    }

    const saveData = async () => {
        const laoding= toast.loading("Updating...",{theme:"dark"});
        try {
            if (!profile.name) {
                toast.error("Name is required",{theme:"dark"});
                return;
            }
    
            if (!profile.email) {
                toast.error("Email is required",{theme:"dark"});
                return;
            }
    
            if (!profile.userName) {
                toast.error("Username is required",{theme:"dark"});
                return;
            }
    
            // check bio length
            if(profile.bio && profile.bio.length > 100){
                toast.error("Bio must be less than 100 characters",{theme:"dark"});
                return;
            }
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profile),
            });

            const data = await res.json();

            if (res.ok && data.updateData) {
                toast.success("Profile Updated Successfully",{theme:"dark"});
                setuserName(profile.userName);
                fetchDataAndSet();
            } else {
                toast.error(data.message || "Something went wrong",{theme:"dark"});
            }
        } catch (error) {
            console.error(error);
            toast.error("Network Error",{theme:"dark"});
        }finally{
            toast.dismiss(laoding);
        }
    };

    useEffect(() => {
        fetchDataAndSet();
    }, [])
    

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="min-h-screen bg-[#111827] text-white flex justify-center items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-[#1F2937] rounded-2xl shadow-xl p-8">

                {/* Heading */}

                <h1 className="text-3xl font-bold text-center mb-10">
                    Edit Profile
                </h1>

                {/* Profile */}

                <div className="flex flex-col items-center mb-10">

                    <img
                        src={profile?.profilePicture || "/profile.png"}
                        alt="profile"
                        width={120}
                        height={120}
                        className="rounded-full object-cover border-4 border-slate-600"
                    />

                </div>

                <form
                    className="space-y-6"
                >

                    {/* Name */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={profile?.name || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Username */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Username
                        </label>

                        <input
                            type="text"
                            name="userName"
                            value={profile?.userName || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* profile img */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Profile Picture
                        </label>

                        <input
                            type="text"
                            name="profilePicture"
                            value={profile?.profilePicture || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Bio */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Bio
                        </label>

                            {/* show bio length */}
                            <div className="flex justify-end py-1 items-center">
                                <span>{profile?.bio?.length || 0}/100</span>
                            </div>
                        <textarea
                            rows={4}
                            name="bio"
                            value={profile?.bio || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 resize-none"
                        />
                    </div>

                    {/* Email */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={profile?.email || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Website */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Website
                        </label>

                        <input
                            type="text"
                            name="website"
                            value={profile?.website || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Location */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={profile?.location || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Gender */}

                    <div>
                        <label className="block mb-2 text-sm text-slate-300">
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={profile?.gender || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-800 rounded-lg px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500"
                        >
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Other</option>
                        </select>
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-6">

                        <button
                            type="button"
                            onClick={saveData}
                            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>
        </main>
    );
}