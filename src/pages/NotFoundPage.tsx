
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost, Search, Home } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative inline-block mb-8">
                        <motion.div
                            className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-600 opacity-20 select-none"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            404
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800">
                                <Ghost className="h-20 w-20 text-violet-500" />
                            </div>
                        </motion.div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                        Lost in the Void?
                    </h1>

                    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto">
                        The page you are looking for has vanished into the ether. It might have been moved, deleted, or perhaps it never existed in this realm.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/">
                            <Button size="lg" className="h-12 px-8 text-base bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                <Home className="mr-2 h-4 w-4" /> Return Home
                            </Button>
                        </Link>
                        <Link to="/demo">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                <Search className="mr-2 h-4 w-4" /> Try Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
                >
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        Error Code: 404_PAGE_NOT_FOUND
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
