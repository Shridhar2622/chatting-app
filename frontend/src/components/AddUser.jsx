import React, { useState } from "react";
import { X, Search, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";

function AddUser({ close }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");

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
          <div className={`relative flex items-center h-12 rounded-xl border-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 ${isDark ? "bg-slate-800/50 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"
            }`}>
            <Search className={`w-5 h-5 ml-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
            <input
              type="text"
              placeholder="Search via email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none px-4 placeholder:text-slate-400"
              autoFocus
            />
          </div>
        </div>

        {/* Results Area (Placeholder) */}
        <div className={`text-center py-8 rounded-2xl border-2 border-dashed ${isDark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"
          }`}>
          {search ? (
            <p>Searching for users...</p>
          ) : (
            <p>Type an email to find friends</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;
