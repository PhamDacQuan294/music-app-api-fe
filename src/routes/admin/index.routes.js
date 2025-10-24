import LayoutAuth from "../../layout/admin/LayoutAuth";
import LayoutDefault from "../../layout/admin/LayoutDefault";
import { accountRoutes } from "./account.route";
import { authRoutes } from "./auth.route";
import { dashboardRoutes } from "./dashboard.route";
import { roleRoutes } from "./role.route";
import { singerRoutes } from "./singer.route";
import { songRoutes } from "./song.route";
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
          ...songRoutes,
          ...singerRoutes,
          ...roleRoutes,
          ...accountRoutes
        ]
      }
    ]
  },
  {
    path: "/admin/auth",
    element: <LayoutAuth />,
    children: [...authRoutes],
  }
];
