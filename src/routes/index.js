import LayoutDefault from "../layout/LayoutDefault";
import Dashboard from "../pages/Dashboard";
import Topics from "../pages/Topics";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/api/v1/",
        children: [
          {
            path: "topics",
            element: <Topics />
          },
          {
            path: "songs/:id",
          }
        ]
      }
    ]
  }
];