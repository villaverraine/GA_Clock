import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './components/UserContext';


import Login from './pages/Login';


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Login/>,
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
