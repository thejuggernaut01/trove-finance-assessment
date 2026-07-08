import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/context/tanstack-provider.tsx';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <Toaster
        position="bottom-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </QueryClientProvider>
  </StrictMode>
);
