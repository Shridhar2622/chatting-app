import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { Mail, Lock, Sun, Moon, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { post, loading, error } = useApi();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid = email && password;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await post("/login", { email, password });
      navigate("/chat");
    } catch (e) {
      console.log(e);
    }
  }

  const isDark = theme === "dark";

  return (
    <div
      className={`w-full h-screen flex justify-center items-center transition-colors duration-500 overflow-hidden relative  ${isDark
          ? "bg-[#0f172a]"
          : "bg-gradient-to-br from-[#e0f2fe] via-[#dbeafe] to-[#bfdbfe]"
        }`}
    >
      {/* Animated Background Elements */}
      <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob ${isDark ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
      <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-900' : 'bg-blue-300'}`}></div>
      <div className={`absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000 ${isDark ? 'bg-indigo-900' : 'bg-indigo-300'}`}></div>

      {/* Theme Toggle */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 ${isDark
            ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
            : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Glassmorphism Card */}
      <div
        className={`relative w-[420px] backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border transition-all duration-300 ${isDark
            ? "bg-slate-900/60 border-slate-700 text-white"
            : "bg-white/60 border-white/50 text-slate-800"
          }`}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isDark ? "text-slate-400 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-500"
                  }`}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 pl-12 pr-4 rounded-xl outline-none border-2 transition-all duration-300 ${isDark
                    ? "bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white placeholder-slate-500"
                    : "bg-white/50 border-slate-200 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                  }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isDark ? "text-slate-400 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-500"
                  }`}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-12 pl-12 pr-4 rounded-xl outline-none border-2 transition-all duration-300 ${isDark
                    ? "bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white placeholder-slate-500"
                    : "bg-white/50 border-slate-200 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                  }`}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            disabled={!isValid || loading}
            className={`h-12 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 transform active:scale-[0.98] ${isValid && !loading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25"
                : "bg-slate-400 cursor-not-allowed opacity-70"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 font-bold cursor-pointer hover:text-blue-400 hover:underline transition-colors"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
