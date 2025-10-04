export const sortAction = (type, payload) => {
  return {
    type: `SORT_${type}`, 
    payload
  }
}