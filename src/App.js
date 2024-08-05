import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './components/UserContext';


import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgetPass from './pages/ForgetPass';
import Admin from './pages/AdminDashboard';
import Profile from './pages/Profile'
import Logs from './pages/AttendanceLogs'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/forget",
    element: <ForgetPass/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/logs",
    element: <Logs/>,
  },
]);


function App() {
  return (
    <UserProvider>
      <SnackbarProvider maxSnack={5}>
      <div className='App'>
        <RouterProvider router={router}/>
      </div>
      </SnackbarProvider>  
    </UserProvider>
  );
}

export default App;
