import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { checkLogin, loginSuccess } from "../../../actions/admin/auth.action";
import { verifyService } from "../../../services/admin/authService"; 

function PrivateRouters() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.admin.auth);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = getCookie("token");

    const verifyToken = async () => {
      if (token) {
        try {
          const res = await verifyService(token); 
          if (res.code === 200) {
            dispatch(loginSuccess({
              user: res.user,
              role: res.role
            }));
          } else {
            dispatch(checkLogin(false));
          }
        } catch (err) {
          dispatch(checkLogin(false));
        }
      } else {
        dispatch(checkLogin(false));
      }
      setLoading(false);
    };

    verifyToken();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return login ? <Outlet /> : <Navigate to="/admin/auth/login" />;
}

export default PrivateRouters;
