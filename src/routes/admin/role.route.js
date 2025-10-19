import ListRoles from "../../pages/admin/roles";
import RoleCreateForm from "../../pages/admin/roles/CreateRole";

export const roleRoutes= [
  {
    path: "roles",
    element: <ListRoles />, 
    children: [
      {
        path: "permissions",
        element: <ListRoles />,
      },
      {
        path: "create",
        element: <RoleCreateForm />
      }
    ]
  }
]