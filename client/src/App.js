import { 
  createBrowserRouter, 
  Outlet, 
  RouterProvider 
} from "react-router-dom";
import Register from './pages/Register'
import Login from "./pages/Login";
import AddResource from "./pages/AddResource";
import Edit from "./pages/Edit";
import Professor from "./pages/Professor";
import Resources from "./pages/Resources";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppStyle from './App.module.css'
import backgroundImage from './img/static/dark_world_map.jpg'
import WorldMap from "./components/Map/WorldMap";


/* import './style.scss' */


const Layout = () => { 
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddResource />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
    
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/resources/edit",
    element: <Edit />,
  },
  {
    path: "/resources/:id",
    element: <Professor />,
  },
  {
    path: "/map",
    element: <WorldMap />,
  },

]);

function App() {
  return (
    <div className={AppStyle.app} style={{backgroundImage: `url(${backgroundImage})` }}>
      <div className={AppStyle.container} >
          <RouterProvider router={router} />
        </div>
      </div>
    
  );
}

export default App;
