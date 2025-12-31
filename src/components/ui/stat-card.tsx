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
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
                        <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    {trend && (
                        <Badge variant="success" className="text-xs font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trend}
                        </Badge>
                    )}
                </div>
                <div className="space-y-0.5">
                    <p className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</p>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
