import { useDispatch } from "react-redux";
import { getListRoles } from "../../../services/admin/rolesService";
import { getListRolesAction } from "../../../actions/admin/roles.action";
import { useEffect } from "react";
import RoleTable from "./RoleTable";
import "./Roles.scss";

function ListRoles() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const roleRes = await getListRoles();
      dispatch(getListRolesAction(roleRes));
    } catch (error) {
       console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  })

  return (
    <>
      <RoleTable />
    </>
  )
}

export default ListRoles;