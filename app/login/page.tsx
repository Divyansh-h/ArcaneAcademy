// app/login/page.tsx or a component inside /components
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User2, School, Shield } from "lucide-react";
import clsx from "clsx";

const roles = ["Student", "Teacher", "Admin"];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("Student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/${role.toLowerCase()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30 animate-pulse" />
        {/* Animated particles */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className={clsx(
                "absolute rounded-full opacity-30 blur-2xl animate-float",
                i % 3 === 0 ? "bg-purple-500 w-24 h-24 top-1/4 left-1/3" :
                i % 3 === 1 ? "bg-blue-500 w-16 h-16 top-2/3 left-2/3" :
                "bg-pink-500 w-12 h-12 top-1/2 left-1/4"
              )}
              style={{
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-20 w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl text-white">
        <h1 className="text-3xl font-black text-center mb-1 tracking-tight">Welcome Back</h1>
        <p className="text-center text-white/70 mb-6">Login to access your ArcaneAcademy portal</p>
        <div className="flex justify-around mb-4">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setError("");
              }}
              className={clsx(
                "flex items-center gap-1 px-4 py-2 rounded-full transition font-semibold",
                role === r
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              )}
            >
              {r === "Student" && <User2 className="w-4 h-4" />}
              {r === "Teacher" && <School className="w-4 h-4" />}
              {r === "Admin" && <Shield className="w-4 h-4" />}
              {r}
            </button>
          ))}
        </div>
        {error && (
          <div className="bg-red-500/20 text-red-200 text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-300"
              placeholder={role === "Student" ? "student@email.com" : "Enter your email or username"}
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </button>
        </form>
        <div className="flex flex-col items-center mt-6 text-sm space-y-2 text-purple-300">
          <button
            onClick={() => alert("Reset Password coming soon!")}
            className="hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
