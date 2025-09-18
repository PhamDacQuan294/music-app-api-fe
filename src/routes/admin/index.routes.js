import LayoutDefault from "../../layout/admin/LayoutDefault";
import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.routes";

export const routes = [
  {
    path: "/admin",
    element: <LayoutDefault />,
    children: [
      ...dashboardRoutes,
       {
        children: [
          ...topicRoutes,
        ]
      }
    ]
  }
];
