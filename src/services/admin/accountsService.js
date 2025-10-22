import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { get } from "../../utils/request";

export const getListAccounts = async () => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/accounts/`;

  const result = await get(url);
  return result;
}