import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import App from '@/App';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Unstructured from '@/pages/Unstructured';

const LoginRoute = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to='/' replace />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
]);

//#region Admin Routes
const AdminRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/unstructured',
        element: <Unstructured />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
//#endregion Admin Routes

//#region End User Routes
const EndUserRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/end-user/dashboard' replace />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '/end-user',
        errorElement: <h2>Error Page</h2>,
        children: [
          {
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />,
              },
              {
                path: 'unstructured',
                element: <Unstructured />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
//#endregion End User Routes

const isAdmin = true;

const Router = () => {
  return (
    <>
      {console.log('authenticated templaet')}
      <AuthenticatedTemplate>
        <RouterProvider router={isAdmin ? AdminRoutes : EndUserRoutes} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <RouterProvider router={LoginRoute} />
      </UnauthenticatedTemplate>
    </>
  );
};

export default Router;
