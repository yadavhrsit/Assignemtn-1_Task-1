import React from 'react';
import './App.css';
import Table from './Table';
import { data } from './data';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Navigate
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/admin/dashboard" />
    },
    {
      path: "/admin",
      element: <Link to={'/admin/dashboard'}>Admin Welcome Page. Click to go to Dashboard.</Link>,
    },
    {
      path: "/admin/dashboard",
      element: <Table data={data} />,
    },
  ]);
  return (
    <div className="App py-10 px-10 bg-slate-300 min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}
export default App;
