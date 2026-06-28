import { FiSearch } from "react-icons/fi";

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "online",
      action: "Add Friend",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      status: "offline",
      action: "Message",
    },
    {
      id: 3,
      name: "Aman Kumar",
      email: "aman@gmail.com",
      status: "online",
      action: "Friends",
    },
    {
      id: 4,
      name: "Neha Das",
      email: "neha@gmail.com",
      status: "offline",
      action: "Pending",
    },
  ];

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      {/* Search */}
      <div className="relative mb-8">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search users..."
          className="w-full bg-slate-800 rounded-xl pl-11 pr-4 py-3 outline-none border border-slate-700"
        />
      </div>

      {/* Users */}
      <div className="space-y-4">

        {users.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 rounded-xl p-5 flex justify-between items-center hover:bg-slate-700 transition"
          >
            <div className="flex items-center gap-4">

              <div className="relative">
                <img
                  src={`https://i.pravatar.cc/100?img=${user.id + 5}`}
                  className="w-14 h-14 rounded-full"
                />

                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                    user.status === "online"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></span>
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {user.name}
                </h2>

                <p className="text-gray-400 text-sm">
                  {user.email}
                </p>
              </div>

            </div>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg"
            >
              {user.action}
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}