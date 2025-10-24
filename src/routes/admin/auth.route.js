import Login from "../../pages/admin/Auth/Login";
import Logout from "../../pages/admin/Auth/Logout";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  }
];
