'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, School, TrendingUp, BookOpen, MessageCircle, BarChart2, Upload, X } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const mockStudent = {
  name: 'Divyansh Chouhan',
  id: 'E23CSEU0307',
  section: 'A',
  submissions: [
    { subjectId: 'MATH101', subjectName: 'Mathematics', examType: 'Midterm', score: 88, submissionDate: '2024-05-01' },
    { subjectId: 'PHY101', subjectName: 'Physics', examType: 'Final', score: 92, submissionDate: '2024-05-10' },
    { subjectId: 'CHEM101', subjectName: 'Chemistry', examType: 'Quiz', score: 75, submissionDate: '2024-05-15' },
    { subjectId: 'ENG101', subjectName: 'English', examType: 'Assignment', score: 80, submissionDate: '2024-05-20' },
    { subjectId: 'CS101', subjectName: 'Computer Science', examType: 'Midterm', score: 95, submissionDate: '2024-05-25' },
  ],
};

const examTypes = ['All', 'Midterm', 'Final', 'Quiz', 'Assignment'];

function calculateGrade(score: number) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export default function StudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [selectedExamType, setSelectedExamType] = useState('All');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredSubmissions =
    selectedExamType === 'All'
      ? mockStudent.submissions
      : mockStudent.submissions.filter((s) => s.examType === selectedExamType);

  const avgScore =
    mockStudent.submissions.length > 0
      ? Math.round(mockStudent.submissions.reduce((a, b) => a + b.score, 0) / mockStudent.submissions.length)
      : 0;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    simulateUpload();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
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
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress(0);
  };

  const graphData = mockStudent.submissions.map((s) => ({
    subject: s.subjectName,
    score: s.score,
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-16 h-16 sm:w-24 sm:h-24"
        >
          <Image
            src="/logonbg.png"
            alt="Loading..."
            fill
            className="object-contain filter grayscale brightness-150 animate-pulse"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-4 sm:px-6 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-particle" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/20 to-transparent animate-wave" />
        {/* Floating Particles - Reduced on mobile */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400/50 rounded-full"
            initial={{ x: `${(i % 5) * 20}%`, y: '100%' }}
            animate={{ y: '-100%', opacity: [0, 0.3, 0], x: `${(i % 5) * 20}%` }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            style={{ left: `${(i % 5) * 20}%` }}
          />
        ))}
        {/* Pulsating Background Logo - Smaller on mobile */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 6, ease: 'easeInOut' }}
        >
          <div className="relative w-[80vmin] h-[80vmin] sm:w-[60vmin] sm:h-[60vmin] md:w-[40vmin] md:h-[40vmin]">
            <Image
              src="/logonbg.png"
              alt="ArcaneAcademy Background Logo"
              fill
              className="object-contain filter grayscale brightness-150 opacity-50"
            />
            <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Header Logo - Smaller on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30"
      >
        <div className="relative h-8 w-8 sm:h-12 sm:w-12">
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

      {/* Main Content - Adjusted padding and width for mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[95%] sm:max-w-4xl mx-auto p-4 sm:p-8 bg-black/70 backdrop-blur-lg rounded-3xl border border-gray-700/50 shadow-2xl"
      >
        {/* Header - Stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-100 mb-1 flex items-center gap-2">
              <School className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-pulse-slow" />
              Welcome, {mockStudent.name}
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm font-mono">
              Student ID: {mockStudent.id} | Section: {mockStudent.section}
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => router.push('/login')}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-xl font-bold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-900/70 hover:shadow-lg transition-all interactive-card text-sm sm:text-base"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            Logout
          </motion.button>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="flex gap-2 mb-6 sm:mb-8 relative overflow-x-auto pb-2 sm:pb-0">
          <motion.div
            className="absolute bottom-0 h-1 bg-gray-400 rounded-full"
            layoutId="tab-underline"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {[
            { label: 'Grades', icon: <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
            { label: 'Progress', icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" /> },
            { label: 'Assignments', icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> },
            { label: 'Chatbot', icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> },
          ].map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setTab(i)}
              className={clsx(
                'relative flex items-center gap-2 px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm rounded-t-lg transition interactive-card whitespace-nowrap',
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
            </motion.button>
          ))}
        </div>

        {/* Tab Panels */}
        <div>
          {tab === 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-base sm:text-lg font-bold text-gray-200 mb-1">Performance Summary</div>
                  <div className="flex gap-4 sm:gap-8">
                    <div>
                      <div className="text-xs text-gray-400 font-mono">Average Score</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-100">{avgScore}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-mono">Grade</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-100">{calculateGrade(avgScore)}</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-xs mb-1 text-gray-400 font-mono">Filter by Exam Type</label>
                  <motion.select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="px-3 sm:px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 interactive-card text-sm sm:text-base"
                    whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                  >
                    {examTypes.map((type, i) => (
                      <motion.option
                        key={type}
                        value={type}
                        className="bg-gray-900 text-gray-200"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        {type}
                      </motion.option>
                    ))}
                  </motion.select>
                </motion.div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-700/50 bg-gray-900/30">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-3 sm:px-4 py-2 text-left text-gray-200 font-mono">Subject Code</th>
                      <th className="px-3 sm:px-4 py-2 text-left text-gray-200 font-mono">Subject Name</th>
                      <th className="px-3 sm:px-4 py-2 text-left text-gray-200 font-mono">Exam Type</th>
                      <th className="px-3 sm:px-4 py-2 text-left text-gray-200 font-mono">Score</th>
                      <th className="px-3 sm:px-4 py-2 text-left text-gray-200 font-mono">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((s, i) => (
                        <motion.tr
                          key={i}
                          className="even:bg-gray-800/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                        >
                          <td className="px-3 sm:px-4 py-2 text-gray-300">{s.subjectId}</td>
                          <td className="px-3 sm:px-4 py-2 text-gray-300">{s.subjectName}</td>
                          <td className="px-3 sm:px-4 py-2 text-gray-300">{s.examType}</td>
                          <td className="px-3 sm:px-4 py-2 text-gray-300">{s.score}</td>
                          <td className="px-3 sm:px-4 py-2 text-gray-300">{calculateGrade(s.score)}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-400">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-2"
              >
                Progress Tracking
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 text-gray-400"
              >
                Your performance shows a positive trend. Keep up the good work!
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-2"
              >
                {graphData.map((data, i) => (
                  <motion.div
                    key={i}
                    className="relative flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-32 text-gray-300 font-mono text-sm">{data.subject}</div>
                    <div className="flex-1 h-8 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${data.score}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="w-12 text-gray-300 font-mono">{data.score}%</div>
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
                            x: Math.cos(j * (2 * Math.PI / 3)) * 10,
                            y: Math.sin(j * (2 * Math.PI / 3)) * 10,
                          }}
                          transition={{ duration: 0.4, delay: j * 0.05, ease: 'easeOut' }}
                          style={{ top: '50%', left: '50%' }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="list-disc pl-6 space-y-1 text-gray-400 mt-4"
              >
                <li>Review your lower-scored submissions.</li>
                <li>Allocate more time to challenging subjects.</li>
                <li>Seek guidance from your professors during office hours.</li>
              </motion.ul>
            </div>
          )}
          {tab === 2 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-bold text-gray-200 mb-4"
              >
                Assignments
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border border-gray-700/50 rounded-xl p-6 bg-gray-900/30"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              >
                <div className="text-center text-gray-400 mb-4">
                  <Upload className="w-8 h-8 mx-auto mb-2 animate-pulse-slow" />
                  Drag and drop files here or{' '}
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
                  accept=".pdf,.doc,.docx"
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
          {tab === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-lg font-bold text-gray-200 mb-2">Profile Chatbot</div>
              <div className="text-gray-400">Chatbot feature coming soon...</div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Inline Styles */}
      <style jsx>{`
        /* Animation Keyframes */
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

        /* Animation Classes */
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }

        .animate-slow-pulse {
          animation: slow-pulse 12s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
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

        /* Custom Scrollbar */
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

        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .interactive-card {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, button, select {
            font-size: 16px; /* Prevents zoom on iOS */
          }

          /* Hide scrollbar on mobile */
          .overflow-x-auto {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }

          /* Adjust table for mobile */
          table {
            font-size: 12px;
          }

          th, td {
            padding: 8px 4px;
            white-space: nowrap;
          }

          /* Stack elements on mobile */
          .flex-row {
            flex-direction: column;
          }

          /* Adjust spacing for mobile */
          .gap-8 {
            gap: 1rem;
          }

          .p-8 {
            padding: 1rem;
          }

          /* Make buttons more touch-friendly */
          button {
            min-height: 44px;
          }

          /* Improve touch targets */
          .interactive-card {
            cursor: pointer;
            touch-action: manipulation;
          }

          /* Prevent text selection on interactive elements */
          button, select, .interactive-card {
            user-select: none;
            -webkit-user-select: none;
          }

          /* Improve scrolling performance */
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }

          /* Adjust progress bars for mobile */
          .h-8 {
            height: 1.5rem;
          }

          /* Improve form elements on mobile */
          select, input {
            appearance: none;
            -webkit-appearance: none;
            border-radius: 0.5rem;
          }

          /* Add active state for touch devices */
          .interactive-card:active {
            transform: scale(0.98);
          }
        }

        /* Additional responsive breakpoints */
        @media (max-width: 480px) {
          .text-2xl {
            font-size: 1.25rem;
          }

          .text-xl {
            font-size: 1.125rem;
          }

          .text-lg {
            font-size: 1rem;
          }

          .text-sm {
            font-size: 0.875rem;
          }

          .text-xs {
            font-size: 0.75rem;
          }

          /* Adjust spacing for smaller screens */
          .gap-4 {
            gap: 0.75rem;
          }

          .p-4 {
            padding: 0.75rem;
          }

          /* Make table more compact */
          th, td {
            padding: 6px 3px;
          }
        }
      `}</style>
    </div>
  );
}