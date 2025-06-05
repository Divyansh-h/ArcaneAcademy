"use client";

import { useState } from "react";
import { LogOut, Users, BookOpen, Layers, UserPlus, BarChart2, Settings2 } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const mockTeachers = [
  { id: "T1", name: "Prof. Smith", email: "smith@arcane.edu", subjects: ["MATH101"] },
  { id: "T2", name: "Prof. Johnson", email: "johnson@arcane.edu", subjects: ["PHY101"] },
];
const mockStudents = [
  { id: "S1", name: "Alice", section: "A", email: "alice@arcane.edu" },
  { id: "S2", name: "Bob", section: "A", email: "bob@arcane.edu" },
];
const mockSubjects = [
  { id: "MATH101", name: "Mathematics", section: "A", credits: 4, semester: "1", batch: "B1" },
  { id: "PHY101", name: "Physics", section: "A", credits: 3, semester: "1", batch: "B1" },
];
const mockBatches = [
  { id: "B1", name: "Batch 1" },
  { id: "B2", name: "Batch 2" },
];
const mockSemesters = [
  { id: "1", name: "Semester 1" },
  { id: "2", name: "Semester 2" },
];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30 animate-pulse" />
        <div className="pointer-events-none absolute inset-0 z-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={clsx(
                "absolute rounded-full opacity-20 blur-2xl animate-float",
                i % 3 === 0
                  ? "bg-purple-500 w-24 h-24 top-1/4 left-1/3"
                  : i % 3 === 1
                  ? "bg-blue-500 w-16 h-16 top-2/3 left-2/3"
                  : "bg-pink-500 w-12 h-12 top-1/2 left-1/4"
              )}
              style={{
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black mb-1 flex items-center gap-2">
              <Settings2 className="w-8 h-8 text-purple-400" />
              Admin Dashboard
            </h1>
            <div className="text-white/70 text-sm">Manage teachers, students, subjects, and more</div>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/20">
          {[
            { label: "Teachers", icon: <Users className="w-5 h-5" /> },
            { label: "Students", icon: <UserPlus className="w-5 h-5" /> },
            { label: "Subjects", icon: <BookOpen className="w-5 h-5" /> },
            { label: "Batches", icon: <Layers className="w-5 h-5" /> },
            { label: "Semesters", icon: <BarChart2 className="w-5 h-5" /> },
          ].map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 font-semibold transition rounded-t-lg",
                tab === i
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                  : "text-white/70 hover:bg-white/10"
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
        {/* Tab Panels */}
        <div>
          {tab === 0 && (
            <div>
              <div className="text-lg font-bold mb-2">Teachers</div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeachers.map((t, i) => (
                      <tr key={i} className="even:bg-white/5">
                        <td className="px-4 py-2">{t.id}</td>
                        <td className="px-4 py-2">{t.name}</td>
                        <td className="px-4 py-2">{t.email}</td>
                        <td className="px-4 py-2">
                          {t.subjects.map((sid) => (
                            <span key={sid} className="inline-block bg-purple-600/60 rounded px-2 py-1 mr-1 text-xs">
                              {mockSubjects.find((s) => s.id === sid)?.name || sid}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div>
              <div className="text-lg font-bold mb-2">Students</div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Section</th>
                      <th className="px-4 py-2 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((s, i) => (
                      <tr key={i} className="even:bg-white/5">
                        <td className="px-4 py-2">{s.id}</td>
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.section}</td>
                        <td className="px-4 py-2">{s.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 2 && (
            <div>
              <div className="text-lg font-bold mb-2">Subjects</div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Section</th>
                      <th className="px-4 py-2 text-left">Credits</th>
                      <th className="px-4 py-2 text-left">Semester</th>
                      <th className="px-4 py-2 text-left">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubjects.map((s, i) => (
                      <tr key={i} className="even:bg-white/5">
                        <td className="px-4 py-2">{s.id}</td>
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.section}</td>
                        <td className="px-4 py-2">{s.credits}</td>
                        <td className="px-4 py-2">{s.semester}</td>
                        <td className="px-4 py-2">{mockBatches.find((b) => b.id === s.batch)?.name || s.batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 3 && (
            <div>
              <div className="text-lg font-bold mb-2">Batches</div>
              <ul className="list-disc pl-6 text-white/80">
                {mockBatches.map((b) => (
                  <li key={b.id}>
                    <span className="font-bold">{b.name}</span> ({b.id})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === 4 && (
            <div>
              <div className="text-lg font-bold mb-2">Semesters</div>
              <ul className="list-disc pl-6 text-white/80">
                {mockSemesters.map((s) => (
                  <li key={s.id}>
                    <span className="font-bold">{s.name}</span> ({s.id})
                  </li>
                ))}
              </ul>
            </div>
          )}
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