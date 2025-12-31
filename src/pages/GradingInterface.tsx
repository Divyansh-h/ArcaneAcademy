import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Save, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Annotation {
    x: number;
    y: number;
    page: number;
    type: 'tick' | 'cross';
}

const GradingInterface = () => {
    const { submissionId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [numPages, setNumPages] = useState<number>(0);
    const [pdfFile, setPdfFile] = useState<string | null>(null); // URL or Base64
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [activeTool, setActiveTool] = useState<'tick' | 'cross'>('tick');
    const [loading, setLoading] = useState(false);

    // Mock data fetching or real implementation
    useEffect(() => {
        // In a real app, fetch submission details to get the file URL
        // For demonstration, we might need a way to upload a file first to get a URL
        // OR we can use a sample PDF for testing if submissionId is 'demo'
        if (submissionId === 'demo') {
            setPdfFile('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf');
        } else {
            // Fetch from API
            // const fetchSubmission = async () => { ... }
            // fetchSubmission();
        }
    }, [submissionId]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const handlePageClick = (e: React.MouseEvent, pageNumber: number) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalize coordinates (0-1) to handle resizing/different scales if needed
        // For simplicity, we will assume standard rendering and store pixel values for now, 
        // but robust implementation needs relative coords.
        // Let's store relative coords (0-1)
        const relativeX = x / rect.width;
        const relativeY = y / rect.height;

        setAnnotations([...annotations, { x: relativeX, y: relativeY, page: pageNumber, type: activeTool }]);
    };

    const saveGradedPdf = async () => {
        if (!pdfFile) return;
        setLoading(true);

        try {
            // 1. Fetch existing PDF
            const existingPdfBytes = await fetch(pdfFile).then(res => res.arrayBuffer());

            // 2. Load into pdf-lib
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();

            // 3. Draw annotations
            for (const ann of annotations) {
                const page = pages[ann.page - 1];
                const { width, height } = page.getSize();

                const x = ann.x * width;
                const y = height - (ann.y * height); // PDF coordinates create from bottom-left

                if (ann.type === 'tick') {
                    // Draw Green Tick (Keep it simple with text or lines)
                    page.drawText('✓', { x, y, size: 24, color: rgb(0, 0.8, 0) });
                } else {
                    // Draw Red Cross
                    page.drawText('✗', { x, y, size: 24, color: rgb(0.8, 0, 0) });
                }
            }

            // 4. Save
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            // 5. Upload to Backend
            const formData = new FormData();
            formData.append('gradedFile', blob, 'graded.pdf');
            formData.append('grade', '90'); // Example grade, should be an input
            formData.append('feedback', 'Good job!');

            await axios.post(`http://localhost:8000/api/grading/submissions/${submissionId}/grade`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast({ title: "Success", description: "Grading saved successfully!" });
            navigate('/teacher');

        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to save grading.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-100">
            {/* Toolbar */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
                    <h1 className="font-semibold text-lg">Grading Submission</h1>
                </div>
                <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-lg">
                    <Button
                        variant={activeTool === 'tick' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTool('tick')}
                        className={activeTool === 'tick' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                        <Check className="h-4 w-4 mr-2" /> Tick
                    </Button>
                    <Button
                        variant={activeTool === 'cross' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTool('cross')}
                        className={activeTool === 'cross' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                        <X className="h-4 w-4 mr-2" /> Cross
                    </Button>
                </div>
                <Button onClick={saveGradedPdf} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save & Finish
                </Button>
            </div>

            {/* Viewer */}
            <div className="flex-1 overflow-auto p-8 flex justify-center">
                <div className="bg-white shadow-xl min-h-[800px]">
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col gap-4"
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <div key={`page_${index + 1}`} className="relative cursor-crosshair" onClick={(e) => handlePageClick(e, index + 1)}>
                                <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                                {/* Render Overlay Annotations */}
                                {annotations.filter(a => a.page === index + 1).map((ann, i) => (
                                    <div
                                        key={i}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                        style={{ left: `${ann.x * 100}%`, top: `${ann.y * 100}%` }}
                                    >
                                        {ann.type === 'tick' ?
                                            <Check className="h-8 w-8 text-emerald-600 font-bold drop-shadow-md" strokeWidth={4} /> :
                                            <X className="h-8 w-8 text-red-600 font-bold drop-shadow-md" strokeWidth={4} />
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default GradingInterface;
