import React, { useEffect, useState } from 'react';
import useApi from '../services/useApi';
import useFetch from '../services/useFetch';
import { Loader2, ArrowLeft, Camera, User, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
    const { data: user, loading: userLoading, error: userError } = useFetch("/user/chat");
    const { post, loading: saving, error: saveError } = useApi();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // Theme selector to match Chat.jsx styling
    const theme = useSelector((state) => state.theme?.theme) || "light";
    const isDark = theme === "dark";

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setBio(user.bio || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            await post("/profile", { userName: name, bio });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        }
    };

    if (userLoading) {
        return (
            <div className={`h-screen w-full flex items-center justify-center ${isDark ? "bg-[#0f172a]" : "bg-blue-50"}`}>
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (userError) {
        return (
            <div className={`h-screen w-full flex items-center justify-center flex-col gap-4 ${isDark ? "bg-[#0f172a] text-white" : "bg-blue-50 text-slate-800"}`}>
                <p className="text-xl font-semibold">Error loading profile</p>
                <button
                    onClick={() => navigate('/chat')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Chat
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? "bg-[#0f172a]" : "bg-gradient-to-br from-[#e0f2fe] via-[#dbeafe] to-[#bfdbfe]"
            }`}>
            {/* Animated Background Blobs - Matches Chat.jsx */}
            <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob ${isDark ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
            <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-900' : 'bg-blue-300'}`}></div>
            <div className={`absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000 ${isDark ? 'bg-indigo-900' : 'bg-indigo-300'}`}></div>

            {/* Glass Container */}
            <div className={`w-full max-w-2xl backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden relative z-10 transition-colors duration-300 ${isDark ? "bg-slate-900/60 border border-slate-700/50" : "bg-white/60 border border-white/50"
                }`}>

                {/* Header */}
                <div className={`p-6 border-b flex items-center gap-4 ${isDark ? "border-slate-700/50" : "border-white/50"}`}>
                    <button
                        onClick={() => navigate('/chat')}
                        className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-slate-800 text-white" : "hover:bg-white/80 text-slate-700"
                            }`}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Edit Profile</h1>
                </div>

                <div className="p-8">
                    {/* Profile Photo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-white shadow-xl flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
                                {/* Placeholder for user image if one existed, using initial for now */}
                                {name ? name[0].toUpperCase() : <User className="w-12 h-12" />}
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg border-2 border-white">
                                <PlusIcon />
                            </div>
                        </div>
                        <p className={`mt-3 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            Change Profile Photo
                        </p>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-2 animate-in slide-in-from-top-2 ${message.type === 'success'
                            ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                            : 'bg-red-500/10 text-red-600 border border-red-500/20'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className={`block text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/50 ${isDark
                                    ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                                    : "bg-white/50 border-slate-200 text-slate-800 focus:border-blue-500"
                                    }`}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="bio" className={`block text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="4"
                                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/50 resize-none ${isDark
                                    ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                                    : "bg-white/50 border-slate-200 text-slate-800 focus:border-blue-500"
                                    }`}
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Helper icon component
const PlusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Profile;
