export const active = (type) => {
  return {
    type: `ACTIVE_${type}`,
  }
}

export const inActive = (type) => {
  return {
    type: `INACTIVE_${type}`,
  }
}

export const resetStatus = (type) => {
  return {
    type: `RESET_STATUS_${type}`
  }
}

