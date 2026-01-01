import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './lib/ThemeContext'
import { Loader2 } from 'lucide-react'

// Lazy Load Pages
const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const StudentPortal = lazy(() => import('./pages/StudentPortal'))
const TeacherPortal = lazy(() => import('./pages/TeacherPortal'))
const AdminPortal = lazy(() => import('./pages/AdminPortal'))
const GradingInterface = lazy(() => import('./pages/GradingInterface'))
const DemoLandingPage = lazy(() => import('./pages/DemoLandingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Loading Component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
    </div>
)

function App() {
    return (
        <ThemeProvider>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Portals */}
                    <Route path="/student" element={<StudentPortal />} />
                    <Route path="/teacher" element={<TeacherPortal />} />
                    <Route path="/admin" element={<AdminPortal />} />
                    <Route path="/grading/:submissionId" element={<GradingInterface />} />

                    {/* New Pages */}
                    <Route path="/demo" element={<DemoLandingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />

                    {/* 404 Page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    )
}

export default App
