import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { get } from "../../utils/request";

export const getListRoles = async () => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/roles/permissions`;

  const result = await get(url);
  return result;
}