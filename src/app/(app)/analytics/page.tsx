import AnalyticsDashboard from '@/components/app/analytics-dashboard';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Workload Analytics</h1>
          <p className="text-muted-foreground">Visualize faculty workload, leave trends, and submission compliance.</p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
