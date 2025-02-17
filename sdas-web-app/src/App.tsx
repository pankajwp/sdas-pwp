import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/context/theme-provider';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <div className='bg-gradient-to-br from-background to-muted'>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Header />
            <main className='container mx-auto min-h-screen px-4 py-7'>
              <Outlet />
            </main>
            <Footer />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
