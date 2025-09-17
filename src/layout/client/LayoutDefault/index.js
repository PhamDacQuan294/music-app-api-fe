import { Col, Layout, Row } from "antd";
import "./LayoutDefault.scss";
import logo from "../../../images/logo.png";
import { SettingOutlined } from "@ant-design/icons";
import MenuSider from "../../../components/client/MenuSider";
import { Outlet } from "react-router-dom";
import SearchResult from "../../../components/client/Search";

const { Footer, Sider, Content } = Layout;

function LayoutDefault() {
  return (
    <Layout className="layout-default">

      <Sider className="layout-default__sider" theme="light">
        <div className="layout-default__sider-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="layout-default__sider-nav">
          <MenuSider />
        </div>
      </Sider>

      <Layout>
        <header className="layout-default__header">
          <Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <header className="layout-default__header-top">
                <SearchResult />
                <div className="layout-default__header-right">
                  <div className="layout-default__header-collapse">
                    <SettingOutlined />
                  </div>
                  <div className="layout-default__header-search">
                    Người dùng
                  </div>
                </div>
              </header>
            </Col>
          </Row>
        </header>

        <Content className="layout-default__content">
          <Outlet />
        </Content>
        
        <Footer className="layout-default__footer">Footer</Footer>
      </Layout>

    </Layout>
  )
}

export default LayoutDefault;
