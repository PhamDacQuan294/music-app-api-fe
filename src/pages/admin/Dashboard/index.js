import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      message.success(location.state.message);

      //  Xóa message khỏi state để F5 không hiển thị lại
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return <>Dashboard</>;
}

export default Dashboard;
