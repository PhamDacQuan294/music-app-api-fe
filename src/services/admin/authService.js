import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { post } from "../../utils/request"

export const loginService = async (formData) => {
  const result = await post(`${API_PREFIX}/${PREFIX_ADMIN}/auth/login`, formData);
  return result;
}