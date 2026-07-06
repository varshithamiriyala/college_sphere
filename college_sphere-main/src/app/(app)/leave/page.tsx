
'use client';

import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLeaveDashboard from '@/components/app/leave/admin-leave-dashboard';
import FacultyLeaveDashboard from '@/components/app/leave/faculty-leave-dashboard';

export default function LeaveManagementPage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="h-96 w-full" />
                </div>
                <div>
                     <Skeleton className="h-64 w-full" />
                </div>
            </div>
             <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (user.role === 'admin') {
    return <AdminLeaveDashboard />;
  }
  
  // Default to faculty dashboard for leave
  return <FacultyLeaveDashboard />;
}
