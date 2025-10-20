/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { getListRoles } from "../../../services/admin/rolesService";
import { getListRolesAction } from "../../../actions/admin/roles.action";
import { useEffect } from "react";
import RolePermissions from "./Permissions";

function ListPermission() {
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
  }, [])

  return (
    <>
      <RolePermissions />
    </>
  )
}

export default ListPermission;