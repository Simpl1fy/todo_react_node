import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/navbar'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import ErrorPage from './error-page'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        index: true,
        element: <Navigate to="/home" replace={true}/>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
