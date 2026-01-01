
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin } from "lucide-react";

export default function CareersPage() {
    const jobs = [
        { title: "Senior Backend Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
        { title: "AI Research Scientist", dept: "R&D", loc: "San Francisco, CA", type: "Full-time" },
        { title: "Educational Product Manager", dept: "Product", loc: "Remote", type: "Full-time" },
        { title: "Customer Success Lead", dept: "Sales", loc: "New York, NY", type: "Full-time" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Badge variant="outline" className="mb-4">Join the team</Badge>
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Build the future of education with us</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        We're a team of educators, engineers, and researchers passionate about making grading fair, fast, and transparent.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {jobs.map((job, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 transition-all">
                            <div className="mb-4 md:mb-0 text-center md:text-left">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{job.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-zinc-500 mt-1 justify-center md:justify-start">
                                    <span>{job.dept}</span>
                                    <span>•</span>
                                    <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{job.loc}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <Button variant="outline">Apply Now <ExternalLink className="h-4 w-4 ml-2" /></Button>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
