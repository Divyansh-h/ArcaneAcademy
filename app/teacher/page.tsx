'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, ClipboardList, FileText, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const mockBatches = [
  { id: 'B1', name: 'Batch 1' },
  { id: 'B2', name: 'Batch 2' },
];
const mockSubjects = [
  { id: 'MATH101', name: 'Mathematics' },
  { id: 'PHY101', name: 'Physics' },
];
const examTypes = ['Midterm', 'Final', 'Quiz', 'Assignment'];
const mockStudents = [
  { id: 'S1', name: 'Alice', section: 'A', batch: 'B1' },
  { id: 'S2', name: 'Bob', section: 'A', batch: 'B1' },
  { id: 'S3', name: 'Charlie', section: 'B', batch: 'B2' },
];
const mockSubmissions = [
  {
    id: 'sub1',
    studentId: 'S1',
    subjectId: 'MATH101',
    examType: 'Midterm',
    submissionText: 'My answer...',
    submissionDate: '2024-05-01',
    score: 90,
    feedback: 'Great job!',
    graded: true,
  },
  {
    id: 'sub2',
    studentId: 'S2',
    subjectId: 'PHY101',
    examType: 'Final',
    submissionText: 'My answer...',
    submissionDate: '2024-05-10',
    score: null,
    feedback: null,
    graded: false,
  },
];

type Submission = {
  id: string;
  studentId: string;
  subjectId: string;
  examType: string;
  submissionText: string;
  submissionDate: string;
  score: number | null;
  feedback: string | null;
  graded: boolean;
};

type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

export default function TeacherPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0].id);
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedExamType, setSelectedExamType] = useState(examTypes[0]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const filteredStudents = mockStudents.filter((s) => s.batch === selectedBatch);
  const filteredSubmissions = mockSubmissions.filter(
    (s) => s.subjectId === selectedSubject && s.examType === selectedExamType
  );

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: chatMessages.length + 2,
        text: `Received your query: "${newMessage.text}". How can I assist you further? (This is a mock response.)`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-5 animate-particle noise-bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-200/50 animate-slow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-200/20 to-transparent animate-wave" />
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/50 rounded-full"
            initial={{ x: `${(i % 5) * 20}%`, y: '100%' }}
            animate={{ y: '-100%', opacity: [0, 0.3, 0], x: `${(i % 5) * 20}%` }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            style={{ left: `${(i % 5) * 20}%` }}
          />
        ))}
        {/* Pulsating Background Logo */}
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
              className="object-contain opacity-30"
            />
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
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
            className="object-contain"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400/50"
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
        className="relative z-10 w-full max-w-5xl mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-3xl border border-green-200 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1 flex items-center gap-2">
              <Users className="w-8 h-8 text-green-600 animate-pulse-slow" />
              Welcome, Teacher!
            </h1>
            <div className="text-gray-600 text-sm font-mono">Manage your students and assignments</div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-red-500 text-white border border-red-400 hover:bg-red-600 hover:shadow-lg transition-all interactive-card"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 relative">
          <motion.div
            className="absolute bottom-0 h-1 bg-green-400 rounded-full"
            layoutId="tab-underline"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {[
            { label: 'Student List', icon: <Users className="w-5 h-5" /> },
            { label: 'Create Assignment', icon: <ClipboardList className="w-5 h-5" /> },
            { label: 'Create Question Paper', icon: <FileText className="w-5 h-5" /> },
            { label: 'Grade Students', icon: <CheckCircle2 className="w-5 h-5" /> },
            { label: 'Chatbot', icon: <MessageCircle className="w-5 h-5" /> },
          ].map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setTab(i)}
              className={clsx(
                'relative flex items-center gap-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition interactive-card',
                tab === i ? 'bg-green-800 border border-green-600 text-green-200' : 'text-green-400 hover:bg-green-900/70'
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
                    className="absolute w-1 h-1 bg-green-200 rounded-full"
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 flex flex-col md:flex-row gap-4 md:items-end"
              >
                <div>
                  <label className="block text-xs mb-1 text-green-400 font-mono">Select Batch</label>
                  <motion.select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 interactive-card"
                    whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                  >
                    {mockBatches.map((b, i) => (
                      <motion.option
                        key={b.id}
                        value={b.id}
                        className="bg-green-900 text-green-200"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        {b.name}
                      </motion.option>
                    ))}
                  </motion.select>
                </div>
              </motion.div>
              <div className="overflow-x-auto rounded-xl border border-green-700/50 bg-green-900/30">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-green-800/50">
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Student ID</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Name</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Section</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((s, i) => (
                        <motion.tr
                          key={i}
                          className="even:bg-green-800/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                        >
                          <td className="px-4 py-2 text-green-300">{s.id}</td>
                          <td className="px-4 py-2 text-green-300">{s.name}</td>
                          <td className="px-4 py-2 text-green-300">{s.section}</td>
                          <td className="px-4 py-2 text-green-300">{mockBatches.find((b) => b.id === s.batch)?.name}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-green-400">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-lg font-bold text-green-200 mb-2">Create Assignment</div>
              <div className="text-green-400">Assignment creation coming soon...</div>
            </motion.div>
          )}
          {tab === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-lg font-bold text-green-200 mb-2">Create Question Paper</div>
              <div className="text-green-400">Question paper creation coming soon...</div>
            </motion.div>
          )}
          {tab === 3 && (
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 mb-4"
              >
                <div>
                  <label className="block text-xs mb-1 text-green-400 font-mono">Subject</label>
                  <motion.select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 interactive-card"
                    whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                  >
                    {mockSubjects.map((s, i) => (
                      <motion.option
                        key={s.id}
                        value={s.id}
                        className="bg-green-900 text-green-200"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        {s.name}
                      </motion.option>
                    ))}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-green-400 font-mono">Exam Type</label>
                  <motion.select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 interactive-card"
                    whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                  >
                    {examTypes.map((t, i) => (
                      <motion.option
                        key={t}
                        value={t}
                        className="bg-green-900 text-green-200"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        {t}
                      </motion.option>
                    ))}
                  </motion.select>
                </div>
              </motion.div>
              <div className="overflow-x-auto rounded-xl border border-green-700/50 bg-green-900/30">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-green-800/50">
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Student Name</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Exam Type</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Submission Date</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Status</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Score</th>
                      <th className="px-4 py-2 text-left text-green-200 font-mono">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub, i) => {
                        const student = mockStudents.find((s) => s.id === sub.studentId);
                        return (
                          <motion.tr
                            key={i}
                            className="even:bg-green-800/20"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                          >
                            <td className="px-4 py-2 text-green-300">{student?.name || sub.studentId}</td>
                            <td className="px-4 py-2 text-green-300">{sub.examType}</td>
                            <td className="px-4 py-2 text-green-300">{new Date(sub.submissionDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                              {sub.graded ? (
                                <span className="text-green-400 font-bold">Graded</span>
                              ) : (
                                <span className="text-yellow-400 font-bold">Not Graded</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-green-300">{sub.score !== null ? sub.score : '-'}</td>
                            <td className="px-4 py-2">
                              <motion.button
                                className="px-4 py-1 rounded-lg bg-green-800 text-green-200 border border-green-600 font-bold interactive-card"
                                onClick={() => setSelectedSubmission(sub)}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {sub.graded ? 'Review' : 'Grade'}
                              </motion.button>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-green-400">
                          No submissions found for this subject and exam type.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Grading Panel */}
              <AnimatePresence>
                {selectedSubmission && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 p-6 rounded-2xl bg-green-900/30 border border-green-700/50 shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-green-200">
                        {selectedSubmission.graded ? 'Reviewing' : 'Grading'} Submission
                      </div>
                      <motion.button
                        className="px-4 py-1 rounded-lg bg-green-800/50 text-green-200 font-bold interactive-card"
                        onClick={() => {
                          setSelectedSubmission(null);
                          setGrade('');
                          setFeedback('');
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Close
                      </motion.button>
                    </div>
                    <div className="mb-2 text-green-300">
                      <span className="font-bold">Student:</span>{' '}
                      {mockStudents.find((s) => s.id === selectedSubmission.studentId)?.name || selectedSubmission.studentId}
                    </div>
                    <div className="mb-2 text-green-300">
                      <span className="font-bold">Submitted:</span>{' '}
                      {new Date(selectedSubmission.submissionDate).toLocaleString()}
                    </div>
                    <div className="mb-4 p-3 rounded bg-green-800/50">
                      <div className="font-bold mb-1 text-green-200">Submission Content:</div>
                      <div className="text-green-300">{selectedSubmission.submissionText}</div>
                    </div>
                    {!selectedSubmission.graded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-4 flex flex-wrap gap-2"
                      >
                        {[
                          { label: 'A+ (100)', score: '100', color: 'bg-green-500' },
                          { label: 'A (90)', score: '90', color: 'bg-blue-500' },
                          { label: 'B (80)', score: '80', color: 'bg-purple-500' },
                          { label: 'C (70)', score: '70', color: 'bg-yellow-500' },
                          { label: 'D (60)', score: '60', color: 'bg-orange-500' },
                          { label: 'F (0)', score: '0', color: 'bg-red-500' },
                        ].map((g, i) => (
                          <motion.button
                            key={g.score}
                            className={clsx(
                              'px-4 py-1 rounded-lg text-white font-bold interactive-card',
                              g.color.replace('bg-', 'bg-gray-600')
                            )}
                            onClick={() => setGrade(g.score)}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                          >
                            {g.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex flex-col md:flex-row gap-4 mb-4"
                    >
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 interactive-card"
                        placeholder="Score"
                        disabled={selectedSubmission.graded}
                      />
                      <input
                        type="text"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 interactive-card"
                        placeholder="Feedback"
                        disabled={selectedSubmission.graded}
                      />
                    </motion.div>
                    {!selectedSubmission.graded && (
                      <motion.button
                        className="px-8 py-2 rounded-xl font-bold bg-green-800 text-green-200 border border-green-600 hover:bg-green-900/70 transition-all interactive-card"
                        onClick={() => {
                          setSelectedSubmission({
                            ...selectedSubmission,
                            graded: true,
                            score: Number(grade),
                            feedback,
                          });
                          setGrade('');
                          setFeedback('');
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Grade
                      </motion.button>
                    )}
                    {selectedSubmission.graded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-green-400 font-bold mt-2"
                      >
                        Graded!
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {tab === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-[500px]"
            >
              <div className="text-lg font-bold text-green-200 mb-2">Teacher Assistant Chatbot</div>
              <div className="flex-1 bg-green-900/30 border border-green-700/50 rounded-xl p-4 overflow-y-auto" ref={chatContainerRef}>
                {chatMessages.length === 0 && (
                  <div className="text-green-400 text-center h-full flex items-center justify-center">
                    Start a conversation with the assistant...
                  </div>
                )}
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={clsx(
                      'mb-4 p-3 rounded-lg max-w-[80%]',
                      msg.sender === 'user' ? 'ml-auto bg-green-800/50 text-green-200' : 'mr-auto bg-green-700/50 text-green-300'
                    )}
                  >
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-xs text-green-400 font-mono mt-1">{msg.timestamp}</div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mr-auto p-3 rounded-lg bg-green-700/50 max-w-[80%]"
                  >
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-4 flex gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-800/50 border border-green-700/50 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 interactive-card"
                  placeholder="Type your message..."
                />
                <motion.button
                  className="px-4 py-2 rounded-lg bg-green-800 text-green-200 border border-green-600 interactive-card"
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </motion.div>
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
      `}</style>
    </div>
  );
}