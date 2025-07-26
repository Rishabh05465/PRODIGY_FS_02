import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "../core/pages/Login"
import Register from "../core/pages/register";
import Employee from "../core/pages/Employee";
import ProtectedRoute from "../core/atoms/protectedRoutes";

function Approuter(){
    const router = createBrowserRouter([
    {
        path:"/",
        element:<Login/>,
        errorElement:<div>error 404</div>
    },
    {
        path:"/login",
        element:<Login/>,
        errorElement:<div>error 404</div>
    },
    {
        path:"/register",
        element:<Register/>,
        errorElement:<div>error 404</div>
    },
    {
        path:"/employee",
        element:(
          <ProtectedRoute>
              <Employee/>
          </ProtectedRoute>
        ),
        errorElement:<div>error 404</div>
    }
    ])

    return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export const raja = "dfs";
export default Approuter;