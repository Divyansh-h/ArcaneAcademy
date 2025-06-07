'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Users, BookOpen, Layers, UserPlus, BarChart2, Settings2, Upload, X } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const mockTeachers = [
  { id: 'T1', name: 'Prof. Smith', email: 'smith@arcane.edu', subjects: ['MATH101'] },
  { id: 'T2', name: 'Prof. Johnson', email: 'johnson@arcane.edu', subjects: ['PHY101'] },
];
const mockStudents = [
  { id: 'S1', name: 'Alice', section: 'A', email: 'alice@arcane.edu' },
  { id: 'S2', name: 'Bob', section: 'A', email: 'bob@arcane.edu' },
];
const mockSubjects = [
  { id: 'MATH101', name: 'Mathematics', section: 'A', credits: 4, semester: '1', batch: 'B1' },
  { id: 'PHY101', name: 'Physics', section: 'A', credits: 3, semester: '1', batch: 'B1' },
];
const mockBatches = [
  { id: 'B1', name: 'Batch 1' },
  { id: 'B2', name: 'Batch 2' },
];
const mockSemesters = [
  { id: '1', name: 'Semester 1' },
  { id: '2', name: 'Semester 2' },
];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', section: '', batch: mockBatches[0].id });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', subjects: [] as string[] });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback(() => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  // Memoize filtered data
  const filteredTeachers = useMemo(() => mockTeachers, []);
  const filteredStudents = useMemo(() => mockStudents, []);
  const filteredSubjects = useMemo(() => mockSubjects, []);

  // Optimize handlers with useCallback
  const handleStudentSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (studentForm.name && studentForm.email && studentForm.section && studentForm.batch) {
      console.log('Adding student:', studentForm);
      setStudentForm({ name: '', email: '', section: '', batch: mockBatches[0].id });
    }
  }, [studentForm]);

  const handleTeacherSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (teacherForm.name && teacherForm.email && teacherForm.subjects.length > 0) {
      console.log('Adding teacher:', teacherForm);
      setTeacherForm({ name: '', email: '', subjects: [] });
    }
  }, [teacherForm]);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) => f.type === 'application/pdf');
    setFiles((prev) => [...prev, ...droppedFiles]);
    simulateUpload();
  }, [simulateUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((f) => f.type === 'application/pdf');
      setFiles((prev) => [...prev, ...selectedFiles]);
      simulateUpload();
    }
  }, [simulateUpload]);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress(0);
  }, []);

  // Optimize animations based on user preferences
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-4 py-8">
      {/* Animated Background - Optimized */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-particle" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/20 to-transparent animate-wave" />
        {/* Floating Particles - Reduced count and optimized */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400/50 rounded-full"
            initial={{ x: `${(i % 5) * 20}%`, y: '100%' }}
            animate={{ y: '-100%', opacity: [0, 0.3, 0], x: `${(i % 5) * 20}%` }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            style={{ left: `${(i % 5) * 20}%` }}
          />
        ))}
        {/* Pulsating Background Logo - Optimized */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 6, ease: 'easeInOut' }}
        >
          <div className="relative w-[60vmin] h-[60vmin] md:w-[40vmin] md:h-[40vmin]">
            <Image
              src="/logonbg.png"
              alt="ArcaneAcademy Background Logo"
              fill
              className="object-contain filter grayscale brightness-150 opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Header Logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-6 left-6 z-30"
      >
        <div className="relative h-12 w-12">
          <Image
            src="/logonbg.png"
            alt="ArcaneAcademy Logo"
            fill
            className="object-contain filter grayscale brightness-150"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gray-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-5xl mx-auto p-8 bg-black/70 backdrop-blur-lg rounded-3xl border border-gray-700/50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-100 mb-1 flex items-center gap-2">
              <Settings2 className="w-8 h-8 text-gray-400 animate-pulse-slow" />
              Admin Dashboard
            </h1>
            <div className="text-gray-400 text-sm font-mono">Manage teachers, students, subjects, and more</div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-900/70 hover:shadow-lg transition-all interactive-card"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 relative">
          <motion.div
            className="absolute bottom-0 h-1 bg-gray-400 rounded-full"
            layoutId="tab-underline"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {[
            { label: 'Teachers', icon: <Users className="w-5 h-5" /> },
            { label: 'Students', icon: <UserPlus className="w-5 h-5" /> },
            { label: 'Subjects', icon: <BookOpen className="w-5 h-5" /> },
            { label: 'Batches', icon: <Layers className="w-5 h-5" /> },
            { label: 'Semesters', icon: <BarChart2 className="w-5 h-5" /> },
            { label: 'Admin Actions', icon: <Settings2 className="w-5 h-5" /> },
          ].map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setTab(i)}
              className={clsx(
                'relative flex items-center gap-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition interactive-card',
                tab === i ? 'bg-gray-800 border border-gray-600 text-gray-200' : 'text-gray-400 hover:bg-gray-900/70'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {t.icon}
              {t.label}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 bg-gray-200 rounded-full"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.5, 0],
                      x: Math.cos(j * (2 * Math.PI / 3)) * 15,
                      y: Math.sin(j * (2 * Math.PI / 3)) * 15,
                    }}
                    transition={{ duration: 0.4, delay: j * 0.05, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }}
                    style={{ top: '50%', left: '50%' }}
                  />
                ))}
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Tab Panels */}
        <div>
          {tab === 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-2"
              >
                Teachers
              </motion.div>
              <div className="overflow-x-auto rounded-xl border border-gray-700/50 bg-gray-900/30">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">ID</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Name</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Email</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((t, i) => (
                      <motion.tr
                        key={i}
                        className="even:bg-gray-800/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                      >
                        <td className="px-4 py-2 text-gray-300">{t.id}</td>
                        <td className="px-4 py-2 text-gray-300">{t.name}</td>
                        <td className="px-4 py-2 text-gray-300">{t.email}</td>
                        <td className="px-4 py-2">
                          {t.subjects.map((sid) => (
                            <span key={sid} className="inline-block bg-gray-600/60 rounded px-2 py-1 mr-1 text-xs text-gray-200">
                              {filteredSubjects.find((s) => s.id === sid)?.name || sid}
                            </span>
                          ))}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-2"
              >
                Students
              </motion.div>
              <div className="overflow-x-auto rounded-xl border border-gray-700/50 bg-gray-900/30">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">ID</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Name</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Section</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, i) => (
                      <motion.tr
                        key={i}
                        className="even:bg-gray-800/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                      >
                        <td className="px-4 py-2 text-gray-300">{s.id}</td>
                        <td className="px-4 py-2 text-gray-300">{s.name}</td>
                        <td className="px-4 py-2 text-gray-300">{s.section}</td>
                        <td className="px-4 py-2 text-gray-300">{s.email}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 2 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-2"
              >
                Subjects
              </motion.div>
              <div className="overflow-x-auto rounded-xl border border-gray-700/50 bg-gray-900/30">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">ID</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Name</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Section</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Credits</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Semester</th>
                      <th className="px-4 py-2 text-left text-gray-200 font-mono">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((s, i) => (
                      <motion.tr
                        key={i}
                        className="even:bg-gray-800/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                      >
                        <td className="px-4 py-2 text-gray-300">{s.id}</td>
                        <td className="px-4 py-2 text-gray-300">{s.name}</td>
                        <td className="px-4 py-2 text-gray-300">{s.section}</td>
                        <td className="px-4 py-2 text-gray-300">{s.credits}</td>
                        <td className="px-4 py-2 text-gray-300">{s.semester}</td>
                        <td className="px-4 py-2 text-gray-300">{mockBatches.find((b) => b.id === s.batch)?.name || s.batch}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-lg font-bold text-gray-200 mb-2">Batches</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                {mockBatches.map((b) => (
                  <li key={b.id}>
                    <span className="font-bold text-gray-200">{b.name}</span> ({b.id})
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {tab === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-lg font-bold text-gray-200 mb-2">Semesters</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                {mockSemesters.map((s) => (
                  <li key={s.id}>
                    <span className="font-bold text-gray-200">{s.name}</span> ({s.id})
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {tab === 5 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-4"
              >
                Admin Actions
              </motion.div>
              {/* Add Student Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 p-6 rounded-xl bg-gray-900/30 border border-gray-700/50"
              >
                <div className="text-md font-bold text-gray-200 mb-4">Add New Student</div>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      placeholder="Student Name"
                      required
                    />
                    <input
                      type="email"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      placeholder="Student Email"
                      required
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={studentForm.section}
                      onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      placeholder="Section (e.g., A)"
                      required
                    />
                    <motion.select
                      value={studentForm.batch}
                      onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                      required
                    >
                      {mockBatches.map((b, i) => (
                        <motion.option
                          key={b.id}
                          value={b.id}
                          className="bg-gray-900 text-gray-200"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          {b.name}
                        </motion.option>
                      ))}
                    </motion.select>
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-2 rounded-xl font-bold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-900/70 transition-all interactive-card"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Student
                  </motion.button>
                </form>
              </motion.div>
              {/* Add Teacher Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 p-6 rounded-xl bg-gray-900/30 border border-gray-700/50"
              >
                <div className="text-md font-bold text-gray-200 mb-4">Add New Teacher</div>
                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      placeholder="Teacher Name"
                      required
                    />
                    <input
                      type="email"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card"
                      placeholder="Teacher Email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 text-gray-400 font-mono">Assign Subjects</label>
                    <div className="flex flex-wrap gap-2">
                      {filteredSubjects.map((s) => (
                        <motion.label
                          key={s.id}
                          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800/50 text-gray-200 interactive-card"
                          whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                        >
                          <input
                            type="checkbox"
                            value={s.id}
                            checked={teacherForm.subjects.includes(s.id)}
                            onChange={(e) => {
                              const subjects = e.target.checked
                                ? [...teacherForm.subjects, s.id]
                                : teacherForm.subjects.filter((sid) => sid !== s.id);
                              setTeacherForm({ ...teacherForm, subjects });
                            }}
                            className="form-checkbox text-gray-400 focus:ring-gray-400"
                          />
                          {s.name}
                        </motion.label>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-2 rounded-xl font-bold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-900/70 transition-all interactive-card"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    disabled={teacherForm.subjects.length === 0}
                  >
                    Add Teacher
                  </motion.button>
                </form>
              </motion.div>
              {/* Upload Answer Sheet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 rounded-xl bg-gray-900/30 border border-gray-700/50"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              >
                <div className="text-md font-bold text-gray-200 mb-4">Upload Answer Sheet PDFs</div>
                <div className="text-center text-gray-400 mb-4">
                  <Upload className="w-8 h-8 mx-auto mb-2 animate-pulse-slow" />
                  Drag and drop PDF files here or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="underline text-gray-200 hover:text-gray-100 interactive-card"
                  >
                    browse
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  className="hidden"
                  accept="application/pdf"
                />
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2 mt-4"
                  >
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg"
                      >
                        <span className="text-gray-300 text-sm truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(i)}
                          className="text-gray-400 hover:text-gray-200 interactive-card"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Inline Styles - Optimized */}
      <style jsx>{`
        /* Animation Keyframes - Optimized */
        @keyframes particle {
          0% { transform: translateY(0); opacity: 0.1; }
          50% { opacity: 0.15; }
          100% { transform: translateY(-10px); opacity: 0.1; }
        }

        @keyframes slow-pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }

        @keyframes wave {
          0% { transform: translateX(-100%); opacity: 0.2; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0.2; }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
        }

        /* Animation Classes - Optimized */
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .animate-slow-pulse {
          animation: slow-pulse 12s ease-in-out infinite;
          will-change: opacity;
        }

        .animate-wave {
          animation: wave 6s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
          will-change: box-shadow;
        }

        /* Base Styles */
        body {
          background: #000000;
          color: #e5e5e5;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .font-mono {
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, Consolas, monospace;
        }

        /* Custom Scrollbar - Optimized */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #4b4b4b;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #666666;
        }

        /* Selection Styling */
        ::selection {
          background: rgba(107, 114, 128, 0.3);
          color: white;
        }

        /* Checkbox Styling - Optimized */
        .form-checkbox {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 2px solid #4b4b4b;
          border-radius: 4px;
          background: #1a1a1a;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .form-checkbox:checked {
          background: #666666;
          border-color: #666666;
        }

        .form-checkbox:checked::after {
          content: '✔';
          display: block;
          color: #e5e5e5;
          text-align: center;
          font-size: 12px;
          line-height: 14px;
        }

        .form-checkbox:focus {
          outline: none;
          ring: 2px solid #666666;
        }

        /* Performance Optimizations */
        .interactive-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Mobile Optimizations */
        @media (max-width: 640px) {
          .interactive-card {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, button, select {
            font-size: 16px;
          }

          .overflow-x-auto {
            -ms-overflow-style: none;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }

          table {
            font-size: 12px;
          }

          th, td {
            padding: 8px 4px;
            white-space: nowrap;
          }

          .flex-row {
            flex-direction: column;
          }

          .gap-8 {
            gap: 1rem;
          }

          .p-8 {
            padding: 1rem;
          }

          button {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}