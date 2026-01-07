import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import AddUser from "../../components/AddUser";
import Logo from "../../assets/logo.png";
import {
    MessageSquare,
    Settings,
    LogOut,
    Plus,
    Search,
    Send,
    Phone,
    Video,
    MoreVertical,
    Sun,
    Moon,
    User,
    Image as ImageIcon,
    Smile,
    Ghost,
    Hexagon
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";

function Chat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post } = useApi();
    const theme = useSelector((state) => state.theme.theme);
    const isDark = theme === "dark";

    const [selectedUser, setSelectedUser] = useState(false);
    const [addUser, setAddUser] = useState(false);

    // Real data integration point
    const contacts = [];

    async function handleLogout() {
        try {
            await post("/logout");
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    return (
        <div className={`w-full h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0f172a]" : "bg-gradient-to-br from-[#e0f2fe] via-[#dbeafe] to-[#bfdbfe]"
            }`}>

            {/* Animated Background Blobs */}
            <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob ${isDark ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
            <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-900' : 'bg-blue-300'}`}></div>
            <div className={`absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000 ${isDark ? 'bg-indigo-900' : 'bg-indigo-300'}`}></div>

            {/* Main Glass Container */}
            <div className="w-full h-full backdrop-blur-2xl shadow-2xl overflow-hidden flex transition-all duration-300"
                style={{
                    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.6)",
                }}
            >

                {/* 1. Navigation Sidebar (Leftmost) */}
                <div className={`w-20 hidden md:flex flex-col items-center py-8 gap-8 border-r transition-colors duration-300 ${isDark ? "border-slate-700/50" : "border-white/50"
                    }`}>
                    {/* Logo Placeholder */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 duration-300 overflow-hidden shadow-lg shadow-blue-500/20">
                        <img
                            src={Logo}
                            alt="App Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 flex flex-col gap-6 w-full px-4">
                        <button className={`p-3 rounded-xl transition-all duration-300 ${isDark ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white" : "bg-blue-100 text-blue-600"
                            }`}>
                            <MessageSquare className="w-6 h-6" />
                        </button>
                        <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-white hover:text-blue-600"
                            }`}>
                            <Settings className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col gap-6 px-4">
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${isDark ? "text-yellow-400 hover:bg-slate-800" : "text-slate-600 hover:bg-white"
                                }`}
                        >
                            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 group ${isDark ? "text-slate-400 hover:bg-red-500/20 hover:text-red-400" : "text-slate-500 hover:bg-red-50 hover:text-red-500"
                                }`}>
                            <LogOut className="w-6 h-6" />
                        </button>
                        <div
                            onClick={() => navigate("/profile")}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                        ></div>
                    </div>
                </div>

                {/* 2. Chat List Sidebar (Middle) */}
                <div className={`w-full md:w-80 flex flex-col border-r transition-colors duration-300 ${isDark ? "border-slate-700/50 bg-slate-900/30" : "border-white/50 bg-white/30"
                    } ${selectedUser ? 'hidden md:flex' : 'flex'}`}>

                    {/* Header */}
                    <div className="p-6 flex items-center justify-between">
                        <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Messages</h2>
                        <button
                            onClick={() => setAddUser(!addUser)}
                            className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="px-6 mb-6">
                        <div className={`relative flex items-center h-12 rounded-xl border-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 ${isDark ? "bg-slate-800/50 border-slate-700 text-white" : "bg-white/60 border-slate-200 text-slate-800"
                            }`}>
                            <Search className={`w-5 h-5 ml-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full h-full bg-transparent border-none outline-none px-4 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                        {contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => setSelectedUser(contact)}
                                    className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 ${isDark
                                        ? "hover:bg-slate-800/60 active:bg-slate-800"
                                        : "hover:bg-white/60 hover:shadow-md active:bg-white/80"
                                        }`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                            {contact.name[0]}
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-800"}`}>
                                                {contact.name}
                                            </h3>
                                            <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                {contact.time}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                            {contact.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={`text-center py-8 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                <p>No contacts yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Chat Area (Rightmost) */}
                <div className={`flex-1 flex flex-col relative ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
                    {selectedUser ? (
                        <>
                            {/* Chat Header */}
                            <div className={`h-20 px-6 shrink-0 border-b flex items-center justify-between backdrop-blur-md z-10 ${isDark ? "border-slate-700/50 bg-slate-900/10" : "border-white/50 bg-white/30"
                                }`}>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setSelectedUser(false)} className="md:hidden p-2 -ml-2 text-slate-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                                        A
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Alice Johnson</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Online</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className={`p-2.5 rounded-full transition-colors ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-white/80 hover:text-blue-600"
                                        }`}>
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className={`p-2.5 rounded-full transition-colors ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-white/80 hover:text-blue-600"
                                        }`}>
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button className={`p-2.5 rounded-full transition-colors ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-white/80 hover:text-blue-600"
                                        }`}>
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className={`text-center text-sm opacity-50 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                    No messages yet. Say hi! 👋
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className={`p-4 shrink-0 backdrop-blur-md ${isDark ? "bg-slate-900/30" : "bg-white/30"}`}>
                                <div className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-transparent ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                                    }`}>
                                    <button className={`p-2 rounded-xl transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                        }`}>
                                        <Plus className="w-6 h-6" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className={`flex-1 bg-transparent outline-none px-2 ${isDark ? "text-white placeholder:text-slate-500" : "text-slate-800 placeholder:text-slate-400"
                                            }`}
                                    />
                                    <button className={`p-2 rounded-xl transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                        }`}>
                                        <ImageIcon className="w-6 h-6" />
                                    </button>
                                    <button className={`p-2 rounded-xl transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                        }`}>
                                        <Smile className="w-6 h-6" />
                                    </button>
                                    <button className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:scale-105 transition-all active:scale-95">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                            <div className={`w-40 h-40 rounded-full mb-6 flex items-center justify-center transition-transform hover:scale-110 duration-300 ${isDark ? "bg-slate-800/50" : "bg-blue-50"
                                }`}>
                                <Ghost className={`w-20 h-20 ${isDark ? "text-slate-600" : "text-blue-200"} animate-bounce`} />
                            </div>
                            <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                                It's quiet here...
                            </h2>
                            <p className={`max-w-md text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Pick a friend from the sidebar or find someone new to start the fun! 👻
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {addUser && <AddUser close={() => setAddUser(false)} />}
        </div>
    );
}

export default Chat;
