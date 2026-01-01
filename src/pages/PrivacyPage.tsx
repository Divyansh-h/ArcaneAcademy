
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto prose dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p className="text-zinc-500 mb-8">Last updated: January 1, 2024</p>

                    <h3>1. Introduction</h3>
                    <p>Arcane Academy ("we", "our", or "us") respects your privacy and is committed to protecting the personal data of our users ("you"). This Privacy Policy explains how we collect, use, and safeguard your information.</p>

                    <h3>2. Data We Collect</h3>
                    <p>We collect information you provide directly to us when you create an account, such as your name, email address, and role (Student, Teacher, or Admin). For educational purposes, we also store assignment submissions, grades, and feedback.</p>

                    <h3>3. How We Use Your Data</h3>
                    <p>We use your data to provide, improve, and personalize our educational services. Specifically:</p>
                    <ul>
                        <li>To manage your account and authentication.</li>
                        <li>To facilitate the grading submission and review process.</li>
                        <li>To provide analytics on academic performance.</li>
                    </ul>

                    <h3>4. Data Security</h3>
                    <p>We implement industry-standard security measures, including encryption and strict access controls, to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
