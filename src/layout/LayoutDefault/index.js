import { Col, Input, Layout, Row } from "antd";
import "./LayoutDefault.scss";
import logo from "../../images/logo.png";
import { MenuUnfoldOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import SongCollection from "../../components/SongCollection";
import MenuSider from "../../components/MenuSider";

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
                <div className="layout-default__header-left">
                  <div className="layout-default__header-collapse">
                    <MenuUnfoldOutlined />
                  </div>
                  <div className="layout-default__header-search">
                    <Input
                      addonBefore={<SearchOutlined />}
                      placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    />
                  </div>
                </div>
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
          <SongCollection />
        </Content>
        
        <Footer className="layout-default__footer">Footer</Footer>
      </Layout>

    </Layout>
  )
}

export default LayoutDefault;
