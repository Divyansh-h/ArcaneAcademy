
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto prose dark:prose-invert">
                    <h1>Terms of Service</h1>
                    <p className="text-zinc-500 mb-8">Last updated: January 1, 2024</p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using Arcane Academy, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our services.</p>

                    <h3>2. User Accounts</h3>
                    <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>

                    <h3>3. Acceptable Use</h3>
                    <p>You agree not to misuse our services. This includes not interfering with the proper working of the platform, not attempting to access restricted areas, and not submitting malicious content.</p>

                    <h3>4. Academic Integrity</h3>
                    <p>Arcane Academy is a tool for education. We encourage academic integrity and reserve the right to suspend accounts found facilitating plagiarism or academic dishonesty.</p>

                    <h3>5. Limitation of Liability</h3>
                    <p>Arcane Academy provides the service "as is" without any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
