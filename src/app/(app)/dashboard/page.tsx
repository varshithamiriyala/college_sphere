
'use client';

import { useUser } from '@/hooks/use-user';
import AdminDashboard from '@/components/app/dashboards/admin-dashboard';
import StudentDashboard from '@/components/app/dashboards/student-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
      </div>
    );
  }

  if (user.role === 'student') {
    return <StudentDashboard />;
  }
  
  // Default to admin/faculty dashboard
  return <AdminDashboard />;
}
