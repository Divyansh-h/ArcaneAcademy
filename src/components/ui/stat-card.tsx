import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description: string;
    trend?: string;
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
    return (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                        <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    {trend && (
                        <Badge variant="success" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trend}
                        </Badge>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
