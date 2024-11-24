import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Applayout from "./components/Applayout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      { path: "/", element: <Navigate to="home" /> },
      { path: "home", element: <Home /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
