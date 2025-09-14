import { del, get, patch, post } from "../utils/request";

export const getListTopic = async () => {
  const result = await get("api/v1/topics");
  return result;
}