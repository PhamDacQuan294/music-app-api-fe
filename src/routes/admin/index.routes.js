import LayoutDefault from "../../layout/admin/LayoutDefault";
import { dashboardRoutes } from "./dashboard.route";

export const routes = [
  {
    path: "/admin",
    element: <LayoutDefault />,
    children: [
      ...dashboardRoutes
    ]
  }
];
