import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StudentPortal from './pages/StudentPortal'
import TeacherPortal from './pages/TeacherPortal'
import AdminPortal from './pages/AdminPortal'
import GradingInterface from './pages/GradingInterface'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/student" element={<StudentPortal />} />
            <Route path="/teacher" element={<TeacherPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/grading/:submissionId" element={<GradingInterface />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
