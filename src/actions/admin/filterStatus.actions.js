export const active = () => {
  return {
    type: "ACTIVE",
  }
}

export const inActive = () => {
  return {
    type: "INACTIVE",
  }
}

export const resetStatus = () => {
  return {
    type: "RESET_STATUS"
  }
}
