import LayoutDefault from "../../layout/client/LayoutDefault";
import { dashboardRoutes } from "./dashboard.routes";
import { songRoutes } from "./song.routes";
import { topicRoutes } from "./topic.routes";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      ...dashboardRoutes,
      {
        path: "/api/v1/",
        children: [
          ...topicRoutes,
          ...songRoutes
        ]
      }
    ]
  }
];
