
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPortal from "./AdminPortal";
import TeacherPortal from "./TeacherPortal";
import StudentPortal from "./StudentPortal";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function DemoLandingPage() {
    const [activeRole, setActiveRole] = useState("student");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Minimal Header for Demo Page - Removed sticky "Back to Home" since PortalLayout has Exit Demo button now, ensuring no double headers */}
            {/* However, the portals are rendering their OWN layouts now (PortalLayout). 
                If we render them inside Tabs, they will bring their own headers.
                To avoid double headers IF we kept the demo header, we remove the demo header or style it differently.
                BUT: PortalLayout uses sticky header. The tabs are wrapper.
                The best UX: The Portal IS the page. The Tabs switcher should probably be a floating element or part of the layout.
                Current design: DemoLandingPage wraps everything in Tabs. 
                Slight issue: PortalLayout includes "min-h-screen". 
                Let's make sure the container in DemoLandingPage doesn't constrain it too weirdly.
            */}

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Offline Demo Mode
                        </Badge>
                    </div>

                    <Tabs defaultValue="student" className="w-auto" onValueChange={setActiveRole}>
                        <TabsList>
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="teacher">Teacher</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Render Active Portal directly to avoid nesting issues or extra scroll containers */}
            {activeRole === 'student' && <StudentPortal demoMode={true} />}
            {activeRole === 'teacher' && <TeacherPortal demoMode={true} />}
            {activeRole === 'admin' && <AdminPortal demoMode={true} />}

            <div className="py-8 text-center text-sm text-zinc-500">
                <p>Note: Data resets on refresh. This is a simulation.</p>
            </div>
        </div>
    );
}
