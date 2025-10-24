import { Card, Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./Login.scss"; 
import { loginService } from "../../../services/admin/authService";
import { setCookie } from "../../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/admin/auth.action";

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await loginService(values);
      if (response.code === 200) {
        setCookie("id", response.data.id, 1);
        setCookie("fullName", response.data.fullName, 1);
        setCookie("email", response.data.email, 1);
        setCookie("token", response.data.token, 1);
        dispatch(checkLogin(true));
        navigate("/admin/dashboard", {
          state: { message: "Đăng nhập thành công!" }
        });
      } else if (response.code === 400) {
        messageApi.error(`${response.message}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {contextHolder}

      <Card className="login-card">
        <div className="login-header">
          <Title level={3}>Đăng nhập Quản trị</Title>
          <p>Vui lòng nhập thông tin của bạn</p>
        </div>

        <Form
          layout="vertical"
          name="login-form"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
      </Card>
    </div>
  );
}

export default Login;
