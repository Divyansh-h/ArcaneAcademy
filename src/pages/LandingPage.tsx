import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
    GraduationCap, BarChart3, TrendingUp, Shield, ArrowRight, Zap, Star, CheckCircle, Users, BookOpen, Award, Play,
} from "lucide-react";

const features = [
    { icon: GraduationCap, title: "Smart Grading", description: "AI-powered grading system with automatic CGPA calculation and intelligent performance tracking.", highlight: "AI-Powered" },
    { icon: BarChart3, title: "Advanced Analytics", description: "Comprehensive grade distribution and performance analytics with visual insights.", highlight: "Real-time" },
    { icon: TrendingUp, title: "Progress Tracking", description: "Visual representation of academic progress with predictive performance indicators.", highlight: "Predictive" },
    { icon: Shield, title: "Secure Access", description: "Enterprise-grade security with role-based access control and data encryption.", highlight: "Enterprise" },
];

const stats = [
    { number: "10K+", label: "Students" },
    { number: "500+", label: "Teachers" },
    { number: "50+", label: "Institutions" },
    { number: "99.9%", label: "Uptime" },
];

const demoOptions = [
    { title: "Student Experience", icon: Users, description: "Explore the student dashboard with sample assignments and grades", path: "/student", color: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
    { title: "Teacher Portal", icon: BookOpen, description: "Try the teacher interface with grading tools and class management", path: "/teacher", color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
    { title: "Admin Dashboard", icon: Award, description: "Experience the full administrative control panel", path: "/admin", color: "bg-violet-50 hover:bg-violet-100 border-violet-200" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-50 rounded-full blur-3xl opacity-50" />
                </div>

                <div className="max-w-7xl mx-auto">
                    <motion.div className="grid lg:grid-cols-2 gap-12 items-center" initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div className="space-y-8" variants={itemVariants}>
                            <div className="space-y-4">
                                <Badge variant="outline" className="bg-zinc-50 text-zinc-700 border-zinc-200">
                                    <Zap className="h-3 w-3 mr-1" />Next-Gen Education Platform
                                </Badge>
                                <h1 className="text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                                    Smart Grading<span className="block text-zinc-500">Made Simple</span>
                                </h1>
                                <p className="text-xl text-zinc-600 leading-relaxed max-w-lg">
                                    Transform your academic experience with our intelligent grading system. Streamlined, secure, and designed for modern education.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register"><Button size="lg" className="w-full sm:w-auto">Get Started<ArrowRight className="h-5 w-5 ml-2" /></Button></Link>
                                <Link to="/login"><Button variant="outline" size="lg" className="w-full sm:w-auto"><Play className="h-5 w-5 mr-2" />Watch Demo</Button></Link>
                            </div>

                            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-zinc-100" variants={itemVariants}>
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-zinc-900">{stat.number}</div>
                                        <div className="text-sm text-zinc-600">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div className="relative" variants={itemVariants}>
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-200 rounded-3xl transform rotate-3 -z-10" />
                            <Card className="relative bg-white rounded-3xl p-8 shadow-2xl border-zinc-100">
                                <CardContent className="p-0 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-zinc-900">Arcane Dashboard</div>
                                                <div className="text-sm text-zinc-500">Grade Management</div>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Live</Badge>
                                    </div>
                                    <div className="space-y-3">
                                        {["Mathematics", "Physics", "Chemistry"].map((subject, i) => (
                                            <div key={subject} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                                                <span className="text-sm font-medium text-zinc-700">{subject}</span>
                                                <Badge variant="outline">{["A+", "A", "B+"][i]}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-zinc-100">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-zinc-900">Overall CGPA</span>
                                            <span className="text-3xl font-bold text-zinc-900">8.7</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Badge variant="outline" className="mb-4 bg-white border-zinc-200"><Star className="h-3 w-3 mr-1" />Features</Badge>
                        <h2 className="text-4xl font-bold text-zinc-900 mb-4">Everything you need for modern grading</h2>
                        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Powerful tools designed to streamline academic management and enhance learning outcomes.</p>
                    </motion.div>

                    <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-zinc-100 rounded-xl"><feature.icon className="h-6 w-6 text-zinc-900" /></div>
                                            <Badge variant="default">{feature.highlight}</Badge>
                                        </div>
                                        <h3 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                                        <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Badge variant="outline" className="mb-4"><Play className="h-3 w-3 mr-1" />Try it out</Badge>
                        <h2 className="text-4xl font-bold text-zinc-900 mb-4">Choose Your Experience</h2>
                        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Explore different user roles and see how Arcane Academy transforms academic management.</p>
                    </motion.div>

                    <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        {demoOptions.map((option, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Link to={option.path}>
                                    <Card className={`cursor-pointer transition-all duration-300 hover:shadow-xl card-hover border-2 ${option.color}`}>
                                        <CardContent className="p-8 text-center">
                                            <div className="flex justify-center mb-6">
                                                <div className="p-4 bg-white rounded-2xl shadow-sm"><option.icon className="h-10 w-10 text-zinc-700" /></div>
                                            </div>
                                            <h3 className="font-semibold text-xl mb-3 text-zinc-900">{option.title}</h3>
                                            <p className="text-zinc-600 leading-relaxed">{option.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-zinc-900 text-white">
                <motion.div className="max-w-4xl mx-auto text-center px-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-4xl font-bold mb-6">Ready to transform your grading experience?</h2>
                    <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">Join thousands of educators and students who trust Arcane Academy for their academic management needs.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register"><Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 w-full sm:w-auto">Get Started Free<ArrowRight className="h-5 w-5 ml-2" /></Button></Link>
                        <Link to="/login"><Button variant="outline" size="lg" className="border-zinc-600 text-white hover:bg-zinc-800 w-full sm:w-auto">Sign In</Button></Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center mt-10 gap-8 text-sm text-zinc-400">
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Free to start</div>
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />No credit card required</div>
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Setup in minutes</div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
