import { Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
      label: <Link to={`/favorite-songs`}>Bài hát yêu thích</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "bai-hat-yeu-thich"
    },
     {
      label: <Link to={`/topics`}>Chủ đề các bài hát</Link>,
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