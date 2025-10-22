import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { del, get, patch, post } from "../../utils/request";

export const getListRoles = async () => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/roles/`;

  const result = await get(url);
  return result;
}

export const createRolePost = async (formData) => {
  const result = await post(`${API_PREFIX}/${PREFIX_ADMIN}/roles/create`, formData);
  return result;
}

export const deleteRole = async (id) => {
  const result = await del(`${API_PREFIX}/${PREFIX_ADMIN}/roles/delete/${id}`);
  return result;
}

export const updateRole = async (id, formData) => {
  const result = await patch(`${API_PREFIX}/${PREFIX_ADMIN}/roles/edit/${id}`, formData);
  return result;
}

export const updatePermissions = async (formData) => {
  const result = await patch(`${API_PREFIX}/${PREFIX_ADMIN}/roles/permissions`, formData);
  return result;
};
