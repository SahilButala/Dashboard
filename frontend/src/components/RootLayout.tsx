// RootLayout.tsx (you can name it anything)
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


import { ThemeProvider } from '@/utils/them-provider';
import SideBar from './SideBar';
import App from '@/App';

function RootLayout() {
  const location = useLocation();
  const hideSidebarPaths = ['/signup' , '/login' , "*"] ; // add more if needed
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        {!shouldHideSidebar && <SideBar />}
        {!shouldHideSidebar && <SidebarTrigger />}
        <main className="w-full  pr-2">
          <App />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
