/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { getListRoles } from "../../services/admin/rolesService";
import { getListRolesAction } from "../../actions/admin/roles.action";
import { useEffect } from "react";

export function useFetchRoles() {
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
}
