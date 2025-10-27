import { Layout } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "../../../images/logo.png";
import logoFold from "../../../images/logo-fold.png";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import "./LayoutDefault.scss";
import MenuSider from "../../../components/admin/MenuSider";
import { useState } from "react";
import { PREFIX_ADMIN } from "../../../components/admin/Contants";
import { useSelector } from "react-redux";
const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.admin.auth); 

  return (
    <>
      <Layout className="layout-default">

        <header className="header">
          <div className={"header__logo " + (collapsed && "header__logo--collapsed")}>
            <img src={collapsed ? (logoFold) : (logo)} alt="Logo" />
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div className="header__collapse" onClick={() => setCollapsed(!collapsed)}>
                <MenuUnfoldOutlined />
              </div>
              <Link to={`/${PREFIX_ADMIN}/dashboard`} className="header__nav-admin">
                 ADMIN
              </Link>
            </div>
            <div className="header__nav-right">
              <Link to={`/${PREFIX_ADMIN}/my-account`} className="header__nav-account">
                {user?.fullName}
              </Link>
              <Link to={`/${PREFIX_ADMIN}/auth/logout`} className="header__nav-logout">
                Đăng xuất
              </Link>
            </div>
          </div>
        </header>

        <Layout>

          <Sider className="sider" collapsed={collapsed} theme="light">
            <MenuSider />
          </Sider>

          <Content className="content">
            <Outlet />
          </Content>

        </Layout>

      </Layout>
    </>
  )
}

export default LayoutDefault;