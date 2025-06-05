"use client";

import { useState } from "react";
import { LogOut, Users, ClipboardList, FileText, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const mockBatches = [
  { id: "B1", name: "Batch 1" },
  { id: "B2", name: "Batch 2" },
];
const mockSubjects = [
  { id: "MATH101", name: "Mathematics" },
  { id: "PHY101", name: "Physics" },
];
const examTypes = ["Midterm", "Final", "Quiz", "Assignment"];
const mockStudents = [
  { id: "S1", name: "Alice", section: "A", batch: "B1" },
  { id: "S2", name: "Bob", section: "A", batch: "B1" },
  { id: "S3", name: "Charlie", section: "B", batch: "B2" },
];
const mockSubmissions = [
  {
    id: "sub1",
    studentId: "S1",
    subjectId: "MATH101",
    examType: "Midterm",
    submissionText: "My answer...",
    submissionDate: "2024-05-01",
    score: 90,
    feedback: "Great job!",
    graded: true,
  },
  {
    id: "sub2",
    studentId: "S2",
    subjectId: "PHY101",
    examType: "Final",
    submissionText: "My answer...",
    submissionDate: "2024-05-10",
    score: null,
    feedback: null,
    graded: false,
  },
];

export default function TeacherPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0].id);
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedExamType, setSelectedExamType] = useState(examTypes[0]);
  const [selectedSubmission, setSelectedSubmission] = useState(null as any);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredStudents = mockStudents.filter((s) => s.batch === selectedBatch);
  const filteredSubmissions = mockSubmissions.filter(
    (s) =>
      s.subjectId === selectedSubject && s.examType === selectedExamType
  );

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
              <Users className="w-8 h-8 text-purple-400" />
              Welcome, Teacher!
            </h1>
            <div className="text-white/70 text-sm">Manage your students and assignments</div>
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
            { label: "Student List", icon: <Users className="w-5 h-5" /> },
            { label: "Create Assignment", icon: <ClipboardList className="w-5 h-5" /> },
            { label: "Create Question Paper", icon: <FileText className="w-5 h-5" /> },
            { label: "Grade Students", icon: <CheckCircle2 className="w-5 h-5" /> },
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
              <div className="mb-4 flex flex-col md:flex-row gap-4 md:items-end">
                <div>
                  <label className="block text-xs mb-1 text-white/60">Select Batch</label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    {mockBatches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">Student ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Section</th>
                      <th className="px-4 py-2 text-left">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((s, i) => (
                        <tr key={i} className="even:bg-white/5">
                          <td className="px-4 py-2">{s.id}</td>
                          <td className="px-4 py-2">{s.name}</td>
                          <td className="px-4 py-2">{s.section}</td>
                          <td className="px-4 py-2">{mockBatches.find((b) => b.id === s.batch)?.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4">
                          No students available for this batch.
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
              <div className="text-lg font-bold mb-2">Create Assignment</div>
              <div className="text-white/70">Assignment creation coming soon...</div>
            </div>
          )}
          {tab === 2 && (
            <div>
              <div className="text-lg font-bold mb-2">Create Question Paper</div>
              <div className="text-white/70">Question paper creation coming soon...</div>
            </div>
          )}
          {tab === 3 && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div>
                  <label className="block text-xs mb-1 text-white/60">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    {mockSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-white/60">Exam Type</label>
                  <select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    {examTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left">Student Name</th>
                      <th className="px-4 py-2 text-left">Exam Type</th>
                      <th className="px-4 py-2 text-left">Submission Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Score</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub, i) => {
                        const student = mockStudents.find((s) => s.id === sub.studentId);
                        return (
                          <tr key={i} className="even:bg-white/5">
                            <td className="px-4 py-2">{student?.name || sub.studentId}</td>
                            <td className="px-4 py-2">{sub.examType}</td>
                            <td className="px-4 py-2">{new Date(sub.submissionDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                              {sub.graded ? (
                                <span className="text-green-400 font-bold">Graded</span>
                              ) : (
                                <span className="text-yellow-400 font-bold">Not Graded</span>
                              )}
                            </td>
                            <td className="px-4 py-2">{sub.score !== null ? sub.score : "-"}</td>
                            <td className="px-4 py-2">
                              <button
                                className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold"
                                onClick={() => setSelectedSubmission(sub)}
                              >
                                {sub.graded ? "Review" : "Grade"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No submissions found for this subject and exam type.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Grading Panel */}
              {selectedSubmission && (
                <div className="mt-8 p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">
                      {selectedSubmission.graded ? "Reviewing" : "Grading"} Submission
                    </div>
                    <button
                      className="px-4 py-1 rounded-lg bg-white/20 text-white font-bold"
                      onClick={() => {
                        setSelectedSubmission(null);
                        setGrade("");
                        setFeedback("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Student:</span>{" "}
                    {mockStudents.find((s) => s.id === selectedSubmission.studentId)?.name ||
                      selectedSubmission.studentId}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Submitted:</span>{" "}
                    {new Date(selectedSubmission.submissionDate).toLocaleString()}
                  </div>
                  <div className="mb-4 p-3 rounded bg-white/5">
                    <div className="font-bold mb-1">Submission Content:</div>
                    <div>{selectedSubmission.submissionText}</div>
                  </div>
                  {!selectedSubmission.graded && (
                    <div className="mb-4 flex gap-2">
                      <button
                        className="px-4 py-1 rounded-lg bg-green-500 text-white font-bold"
                        onClick={() => setGrade("100")}
                      >
                        A+ (100)
                      </button>
                      <button
                        className="px-4 py-1 rounded-lg bg-blue-500 text-white font-bold"
                        onClick={() => setGrade("90")}
                      >
                        A (90)
                      </button>
                      <button
                        className="px-4 py-1 rounded-lg bg-purple-500 text-white font-bold"
                        onClick={() => setGrade("80")}
                      >
                        B (80)
                      </button>
                      <button
                        className="px-4 py-1 rounded-lg bg-yellow-500 text-white font-bold"
                        onClick={() => setGrade("70")}
                      >
                        C (70)
                      </button>
                      <button
                        className="px-4 py-1 rounded-lg bg-orange-500 text-white font-bold"
                        onClick={() => setGrade("60")}
                      >
                        D (60)
                      </button>
                      <button
                        className="px-4 py-1 rounded-lg bg-red-500 text-white font-bold"
                        onClick={() => setGrade("0")}
                      >
                        F (0)
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white"
                      placeholder="Score"
                      disabled={selectedSubmission.graded}
                    />
                    <input
                      type="text"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white"
                      placeholder="Feedback"
                      disabled={selectedSubmission.graded}
                    />
                  </div>
                  {!selectedSubmission.graded && (
                    <button
                      className="px-8 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all"
                      onClick={() => {
                        // Save logic here
                        setSelectedSubmission({
                          ...selectedSubmission,
                          graded: true,
                          score: Number(grade),
                          feedback,
                        });
                        setGrade("");
                        setFeedback("");
                      }}
                    >
                      Save Grade
                    </button>
                  )}
                  {selectedSubmission.graded && (
                    <div className="text-green-400 font-bold mt-2">Graded!</div>
                  )}
                </div>
              )}
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