import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/auth/login';
import Dashboard from '@/pages/app/dashboard';

const router = createBrowserRouter([
  {
    path: '',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export default router;
