import { Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PREFIX_ADMIN } from "../Contants";

function MenuSider() {
  const items = [
    {
      label: <Link to={`/${PREFIX_ADMIN}/dashboard`}>Tổng quan</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/topics`}>Quản lý chủ đề</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/topics"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/songs`}>Quản lý bài hát</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/songs"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/singers`}>Quản lý ca sĩ</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/singers"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/roles/permissions`}>Phân quyền</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/roles/permissions"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/accounts`}>Tài khoản admin</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/accounts"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/users`}>Tài khoản user</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/users"
    },
    {
      label: <Link to={`/${PREFIX_ADMIN}/settings/general`}>Cài đặt chung</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/settings/general"
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