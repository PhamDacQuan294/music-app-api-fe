export const changeMultiStatus = (type, payload) => {
  return {
    type: `CHANGE_MULTI_STATUS_${type}`, 
    payload
  }
}