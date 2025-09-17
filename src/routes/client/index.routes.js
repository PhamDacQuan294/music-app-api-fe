import LayoutDefault from "../../layout/client/LayoutDefault";
import { dashboardRoutes } from "./dashboard.routes";
import { searchRoutes } from "./search.route";
import { songRoutes } from "./song.routes";
import { topicRoutes } from "./topic.routes";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      ...dashboardRoutes,
      {
        children: [
          ...topicRoutes,
          ...songRoutes,
          ...searchRoutes
        ]
      }
    ]
  }
];
