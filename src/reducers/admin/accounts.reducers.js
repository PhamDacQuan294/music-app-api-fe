const initialState = {
  listAccounts: { accounts: [] }
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_ACCOUNTS":
      return { ...state, listAccounts: action.payload };
  
    default:
      return state;
  }
}

export default accountsReducer;