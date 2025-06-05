"use client";

import { useState } from "react";
import { LogOut, School, TrendingUp, BookOpen, MessageCircle, BarChart2 } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const mockStudent = {
  name: "John Doe",
  id: "S123456",
  section: "A",
  submissions: [
    { subjectId: "MATH101", subjectName: "Mathematics", examType: "Midterm", score: 88, submissionDate: "2024-05-01" },
    { subjectId: "PHY101", subjectName: "Physics", examType: "Final", score: 92, submissionDate: "2024-05-10" },
    { subjectId: "CHEM101", subjectName: "Chemistry", examType: "Quiz", score: 75, submissionDate: "2024-05-15" },
    { subjectId: "ENG101", subjectName: "English", examType: "Assignment", score: 80, submissionDate: "2024-05-20" },
    { subjectId: "CS101", subjectName: "Computer Science", examType: "Midterm", score: 95, submissionDate: "2024-05-25" },
  ],
};

const examTypes = ["All", "Midterm", "Final", "Quiz", "Assignment"];

function calculateGrade(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export default function StudentPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [selectedExamType, setSelectedExamType] = useState("All");

  const filteredSubmissions =
    selectedExamType === "All"
      ? mockStudent.submissions
      : mockStudent.submissions.filter((s) => s.examType === selectedExamType);

  const avgScore =
    mockStudent.submissions.length > 0
      ? Math.round(
          mockStudent.submissions.reduce((a, b) => a + b.score, 0) /
            mockStudent.submissions.length
        )
      : 0;

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
      <div className="relative z-10 w-full max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black mb-1 flex items-center gap-2">
              <School className="w-8 h-8 text-purple-400" />
              Welcome, {mockStudent.name}
            </h1>
            <div className="text-white/70 text-sm">
              Student ID: {mockStudent.id} | Section: {mockStudent.section}
            </div>
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
            { label: "Grades", icon: <BarChart2 className="w-5 h-5" /> },
            { label: "Progress", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Assignments", icon: <BookOpen className="w-5 h-5" /> },
            { label: "Chatbot", icon: <MessageCircle className="w-5 h-5" /> },
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
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <div className="text-lg font-bold mb-1">Performance Summary</div>
                  <div className="flex gap-8">
                    <div>
                      <div className="text-xs text-white/60">Average Score</div>
                      <div className="text-2xl font-bold">{avgScore}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Grade</div>
                      <div className="text-2xl font-bold">{calculateGrade(avgScore)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-white/60">Filter by Exam Type</label>
                  <select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    {examTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">Subject Code</th>
                      <th className="px-4 py-2 text-left">Subject Name</th>
                      <th className="px-4 py-2 text-left">Exam Type</th>
                      <th className="px-4 py-2 text-left">Score</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((s, i) => (
                        <tr key={i} className="even:bg-white/5">
                          <td className="px-4 py-2">{s.subjectId}</td>
                          <td className="px-4 py-2">{s.subjectName}</td>
                          <td className="px-4 py-2">{s.examType}</td>
                          <td className="px-4 py-2">{s.score}</td>
                          <td className="px-4 py-2">{calculateGrade(s.score)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No grades available for the selected filter
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div>
              <div className="text-lg font-bold mb-2">Progress Tracking</div>
              <div className="mb-4 text-white/80">
                Your performance shows a positive trend. Keep up the good work!
              </div>
              <ul className="list-disc pl-6 space-y-1 text-white/70">
                <li>Review your lower-scored submissions.</li>
                <li>Allocate more time to challenging subjects.</li>
                <li>Seek guidance from your professors during office hours.</li>
              </ul>
            </div>
          )}
          {tab === 2 && (
            <div>
              <div className="text-lg font-bold mb-2">Assignments</div>
              <div className="text-white/70">Assignment list coming soon...</div>
            </div>
          )}
          {tab === 3 && (
            <div>
              <div className="text-lg font-bold mb-2">Profile Chatbot</div>
              <div className="text-white/70">Chatbot feature coming soon...</div>
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