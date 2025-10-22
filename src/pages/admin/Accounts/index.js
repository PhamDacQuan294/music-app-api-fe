/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { getListAccounts } from "../../../services/admin/accountsService";
import { getListAccountsAction } from "../../../actions/admin/accounts.action";
import { useEffect } from "react";
import AccountTable from "./AccountTable";

function ListAccount() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const accountRes = await getListAccounts();

      dispatch(getListAccountsAction(accountRes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AccountTable />
    </>
  )
}

export default ListAccount;