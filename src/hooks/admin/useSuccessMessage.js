import { useEffect } from "react";
import { message } from "antd";
import { useLocation } from "react-router-dom";

export const useSuccessMessage = () => {
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (location.state?.successMessage) {
      messageApi.open({
        type: "success",
        content: location.state.successMessage,
        duration: 4,
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state, messageApi]);

  return { contextHolder };
};
