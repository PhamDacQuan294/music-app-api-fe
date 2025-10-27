import PrivateRouters from "../../components/admin/PrivateRoutes";
import LayoutAuth from "../../layout/admin/LayoutAuth";
import LayoutDefault from "../../layout/admin/LayoutDefault";
import { accountRoutes } from "./account.route";
import { authRoutes } from "./auth.route";
import { dashboardRoutes } from "./dashboard.route";
import { roleRoutes } from "./role.route";
import { singerRoutes } from "./singer.route";
import { songRoutes } from "./song.route";
import { statisticsRoutes } from "./statistics.route";
import { topicRoutes } from "./topic.routes";

export const routes = [
  {
    path: "/admin",
    element: <PrivateRouters />, 
    children: [
      {
        element: <LayoutDefault />, 
        children: [
          ...dashboardRoutes,
          ...topicRoutes,
          ...songRoutes,
          ...singerRoutes,
          ...roleRoutes,
          ...accountRoutes,
          ...statisticsRoutes
        ],
      },
    ],
  },
  {
    path: "/admin/auth",
    element: <LayoutAuth />,
    children: [...authRoutes],
  }
];
