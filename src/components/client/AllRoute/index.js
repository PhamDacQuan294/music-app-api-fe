import { useRoutes } from "react-router-dom";
import { routes } from "../../../routes/client/index.routes";

function AllRoute() {
  const elements = useRoutes(routes);

  return (
    <>
      {elements}
    </>
  )
}

export default AllRoute;