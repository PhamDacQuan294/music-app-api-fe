/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getListRoles } from "../../../services/admin/rolesService";
import { getListRolesAction } from "../../../actions/admin/roles.action";
import { useEffect, useState } from "react";
import RoleTable from "./RoleTable";
import "./Roles.scss";
import { message } from "antd";

function ListRoles() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.admin.auth);
  const [hasPermission, setHasPermission] = useState(true);

  const fetchData = async () => {
    try {
      const roleRes = await getListRoles();
      console.log(roleRes);
      dispatch(getListRolesAction(roleRes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (role && !role.permissions?.includes("roles_view")) {
      message.warning("Bạn không có quyền xem danh sách nhóm quyền!");
      setHasPermission(false);
    } else {
      setHasPermission(true);
    }
  }, [role]);

  if (!hasPermission) return null;

  return <RoleTable />;
}

export default ListRoles;
