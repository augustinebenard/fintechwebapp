import { Navigate } from 'react-router-dom';
import Layout from '../components/layout';
import Dashboard from '../pages/dashboard';
import UserManagement from '../pages/users';
import Login from '../pages/login';

const routes = (isLoggedIn: boolean) => [

  {
    path: 'app/',
    element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: '', element: <Navigate to="/app/dashboard" /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;