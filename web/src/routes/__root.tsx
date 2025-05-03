import { AppSidebar } from '@/components/app/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: RootTemplate,
})

function RootTemplate() {
    const queryClient = new QueryClient();

    return <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <QueryClientProvider client={queryClient}>
                <div className='px-4 py-2'>
                    <Outlet />
                </div>
            </QueryClientProvider>
        </SidebarInset>
    </SidebarProvider>
}