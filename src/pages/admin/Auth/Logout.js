import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/admin/auth.action";
import { deleteAllCookies } from "../../../helpers/cookie";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    deleteAllCookies();

    dispatch(checkLogin(false));

    // Chuyển hướng về trang login
    window.location.href = "/admin/auth/login";
  }, [dispatch]);

  return null;
}

export default Logout;
