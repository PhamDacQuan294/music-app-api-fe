import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { get, post } from "../../utils/request";

export const getListRoles = async () => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/roles/permissions`;

  const result = await get(url);
  return result;
}

export const createRolePost = async (formData) => {
  const result = await post(`${API_PREFIX}/${PREFIX_ADMIN}/roles/create`, formData);
  return result;
}