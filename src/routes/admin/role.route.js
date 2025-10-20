import ListPermission from "../../pages/admin/Permissions";
import ListRoles from "../../pages/admin/roles";
import RoleCreateForm from "../../pages/admin/roles/CreateRole";

export const roleRoutes= [
  {
    path: "roles",
    children: [
      { 
        index: true,
        element: <ListRoles />,
      },
      {
        path: "permissions",
        element: <ListPermission />,
      },
      {
        path: "create",
        element: <RoleCreateForm />
      }
    ]
  }
]