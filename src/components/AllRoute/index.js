import { useRoutes } from "react-router-dom";
import { routes as clientRoutes } from "../../routes/client/index.routes";
import { routes as adminRoutes } from "../../routes/admin/index.routes";

function AllRoute() {
  const elements = useRoutes([
    ...clientRoutes,
    ...adminRoutes
  ]);

  return <>{elements}</>;
}

export default AllRoute;
