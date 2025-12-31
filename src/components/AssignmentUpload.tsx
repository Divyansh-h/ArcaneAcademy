import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface AssignmentUploadProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
}

export function AssignmentUpload({ open, onOpenChange, classId }: AssignmentUploadProps) {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleUpload = async () => {
        if (!file || !title) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('classId', classId);
            formData.append('teacherId', 'teacher-123'); // From Auth Context in real app
            formData.append('assignmentFile', file);

            await axios.post('http://localhost:8000/api/grading/assignments', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast({ title: "Success", description: "Assignment created successfully!" });
            onOpenChange(false);
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to create assignment.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Assignment</DialogTitle>
                    <DialogDescription>Upload a PDF question paper for your class.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" placeholder="e.g. Midterm Exam" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">PDF</Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".pdf"
                            onChange={e => setFile(e.target.files?.[0] || null)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpload} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
