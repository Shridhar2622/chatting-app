import React, { useState } from "react";
import { X, Search, UserPlus, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useApi from "../services/useApi";
import useFetch from "../services/useFetch";
import { useEffect } from "react";

function AddUser({ close }) {

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  // 1. Fetch all users on mount (Automatic)
  const { data: allUsers, loading: loadingAll, error: errorAll } = useFetch("/user/allUser");

  // 2. Setup manual search (On Click)
  const { get, loading: loadingSearch, error: errorSearch } = useApi();
  const [user, setUser] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const data = await get("/user/searchUser", { params: { email: search } });
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blur Overlay */}
      <div
        onClick={close}
        className={`absolute inset-0 backdrop-blur-sm transition-colors duration-300 ${isDark ? "bg-slate-900/60" : "bg-black/20"
          }`}
      ></div>

      {/* Glass Modal */}
      <div
        className={`relative w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl p-6 border transition-all duration-300 transform animate-in fade-in zoom-in-95 ${isDark
          ? "bg-slate-900/80 border-slate-700 text-white"
          : "bg-white/80 border-white/50 text-slate-800"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? "bg-blue-600/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
              <UserPlus size={24} />
            </div>
            <h2 className="text-xl font-bold">Find User</h2>
          </div>
          <button
            onClick={close}
            className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center h-14 rounded-2xl border-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 ${isDark ? "bg-slate-800/50 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"
              }`}
          >
            <Search className={`w-5 h-5 ml-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
            <input
              type="text"
              placeholder="Search via email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-full bg-transparent border-none outline-none px-4 placeholder:text-slate-400 text-base"
              autoFocus
            />
            <button
              type="submit"
              disabled={loadingSearch}
              className="mr-2 px-6 py-2 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingSearch ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className={`text-center p-1 rounded-2xl border-2 border-dashed transition-all max-h-[300px] overflow-y-auto custom-scrollbar duration-300 ${isDark ? "border-slate-800" : "border-slate-200"
          }`}>

          {/* Case 1: Search Error */}
          {errorSearch && (
            <div className="text-red-500 font-medium p-4">{errorSearch}</div>
          )}

          {/* Case 2: Specific User Found */}
          {user && !errorSearch ? (
            <div className="flex flex-col items-center gap-3 p-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>{user.name}</h3>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{user.email}</p>
              </div>
              <button className="mt-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
                Add Friend
              </button>
            </div>
          ) : (

            // Case 3: Show List of All Users (Suggestions)
            <div className="flex flex-col gap-1 p-0">
              {loadingAll ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              ) : (
                allUsers?.map((u) => (
                  <div key={u._id} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}>
                    <div className="flex items-center gap-3 text-left">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isDark ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"}`}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{u.name}</p>
                        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{u.email}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                      <UserPlus size={18} />
                    </button>
                  </div>
                ))
              )}
              {!loadingAll && allUsers?.length === 0 && (
                <p className={isDark ? "text-slate-500" : "text-slate-400"}>No other users found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>);
}

export default AddUser;
