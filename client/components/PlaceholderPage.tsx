import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { ArrowRight, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
}

export function PlaceholderPage({ title, description, icon, features }: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="text-center mx-4 sm:mx-0">
          <CardHeader className="pb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-amber-600 dark:text-amber-400">
              <Construction className="w-5 h-5" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>

            {features && features.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Planned Features:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                This page is under development. Continue prompting to help build out this section!
              </p>
              <Button variant="outline" className="group">
                Request Implementation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
