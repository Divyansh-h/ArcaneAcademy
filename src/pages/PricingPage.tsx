
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "$0",
            desc: "Perfect for individual teachers and small classes.",
            features: ["Up to 50 students", "Basic Grading AI", "Email Support", "1GB Storage"],
            cta: "Get Started Free",
            variant: "outline"
        },
        {
            name: "Institution",
            price: "$299",
            period: "/month",
            desc: "For schools and colleges requiring full management.",
            features: ["Unlimited students", "Advanced AI Grading", "24/7 Priority Support", "Unlimited Storage", "API Access", "Custom Domain"],
            cta: "Contact Sales",
            variant: "default",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "Tailored solutions for large universities and districts.",
            features: ["Dedicated Server", "On-premise deployment", "SLA Guarantee", "Custom AI Models", "White-labeling"],
            cta: "Talk to Us",
            variant: "outline"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Simple Pricing</Badge>
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Plans for every scale</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">Transparent pricing. No hidden fees. Cancel anytime.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, i) => (
                        <Card key={i} className={`relative flex flex-col ${plan.popular ? 'border-violet-500 shadow-2xl dark:border-violet-500' : 'border-zinc-200 dark:border-zinc-800'}`}>
                            {plan.popular && <div className="absolute top-0 right-0 -mt-3 -mr-3"><Badge className="bg-violet-600 hover:bg-violet-700">Most Popular</Badge></div>}
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">{plan.price}</span>
                                    {plan.period && <span className="text-zinc-500">{plan.period}</span>}
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.variant as any} size="lg">
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 max-w-4xl mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Can I try before buying?</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Yes! You can use our Demo mode to explore all features, or sign up for the free Starter plan.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Is my data secure?</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Absolutely. We use bank-grade encryption and strictly adhere to FERPA and GDPR regulations.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
