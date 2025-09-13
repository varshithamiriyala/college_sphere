import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-card">
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-screen-2xl">
                {children}
            </div>
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
