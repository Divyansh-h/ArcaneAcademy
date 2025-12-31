import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, BarChart3, TrendingUp, Shield, ArrowRight, Zap, CheckCircle, Users, BookOpen, Award } from "lucide-react";

const features = [
    { icon: GraduationCap, title: "Smart Grading", description: "AI-powered grading with automatic CGPA calculation and performance insights." },
    { icon: BarChart3, title: "Analytics", description: "Comprehensive grade distribution and performance analytics." },
    { icon: TrendingUp, title: "Progress Tracking", description: "Visual progress indicators with predictive performance analysis." },
    { icon: Shield, title: "Secure Access", description: "Enterprise-grade security with role-based access control." },
];

const stats = [
    { number: "10K+", label: "Students" },
    { number: "500+", label: "Teachers" },
    { number: "50+", label: "Institutions" },
    { number: "99.9%", label: "Uptime" },
];

const demoOptions = [
    { title: "Student", icon: Users, description: "View assignments and track your grades", path: "/student" },
    { title: "Teacher", icon: BookOpen, description: "Create assignments and grade submissions", path: "/teacher" },
    { title: "Admin", icon: Award, description: "Manage users and configure the system", path: "/admin" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <Badge variant="outline" className="mb-6">
                                <Zap className="h-3 w-3 mr-1" />Next-Gen Education Platform
                            </Badge>
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                            Smart Grading<br />
                            <span className="text-zinc-400">Made Simple</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
                            Transform your academic experience with our intelligent grading system. Built for modern education.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button size="lg">
                                    Get Started<ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg">Sign In</Button>
                            </Link>
                        </motion.div>
                        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.number}</div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Everything you need</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">Powerful tools designed to streamline academic management.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow card-hover">
                                    <CardContent className="p-6">
                                        <div className="p-2.5 bg-violet-50 dark:bg-violet-900/20 rounded-xl w-fit mb-4">
                                            <feature.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo */}
            <section id="demo" className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Try it out</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">Explore different user experiences</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {demoOptions.map((option, index) => (
                            <Link key={index} to={option.path}>
                                <Card className="h-full border border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors cursor-pointer card-hover">
                                    <CardContent className="p-6 text-center">
                                        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit mx-auto mb-4">
                                            <option.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{option.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{option.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-zinc-900 dark:bg-zinc-950">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
                    <p className="text-zinc-400 mb-8">Join thousands who trust Arcane Academy for academic management.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100">
                                Get Started Free<ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center justify-center mt-8 gap-6 text-sm text-zinc-500">
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />Free to start</div>
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />No credit card</div>
                        <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />Quick setup</div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
