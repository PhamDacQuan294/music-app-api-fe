import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { patch } from "../../utils/request";

export const changeStatus = async (status, id, type) => {
  const result = await patch(`${API_PREFIX}/${PREFIX_ADMIN}/${type}/change-status/${status}/${id}`);
  return result;
}

export const ChangeMulti = async (type, option) => {
  const result = await patch(`${API_PREFIX}/${PREFIX_ADMIN}/${type}/change-multi`, option);
  return result;
}