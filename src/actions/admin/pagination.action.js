export const pagination = (type, payload) => {
  return {
    type: `PAGINATION_${type}`, 
    payload
  }
}