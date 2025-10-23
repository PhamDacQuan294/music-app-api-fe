import ListAccount from "../../pages/admin/Accounts";
import CreateAccount from "../../pages/admin/Accounts/CreateAccount";

export const accountRoutes = [
  {
    path: "accounts",
    children: [
      {
        index: true,
        element: <ListAccount />
      },
      {
        path: "create",
        element: <CreateAccount />
      }
    ]
  },
]