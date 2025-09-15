import { Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { API_PREFIX } from "../contants";

function MenuSider() {
  const items = [
     {
      label: <Link to="/">Dashboard</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/"
    },
    {
      label: "Thư viện",
      icon: <MenuUnfoldOutlined />,
      key: "thu-vien"
    },
    {
      label: <Link>Bài hát yêu thích</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "bai-hat-yeu-thich"
    },
     {
      label: <Link to={`${API_PREFIX }/topics`}>Chủ đề các bài hát</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "chu-de"
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        items={items}
      />
    </>
  )
}

export default MenuSider;