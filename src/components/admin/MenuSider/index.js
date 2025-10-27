import { Menu } from "antd";
import { BarChartOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { PREFIX_ADMIN } from "../Contants";

function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname.replace(`/${PREFIX_ADMIN}`, "");

  const items = [
    {
      label: <Link to={`/${PREFIX_ADMIN}/dashboard`}>Tổng quan</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/dashboard",
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
      label: <Link to={`/${PREFIX_ADMIN}/roles`}>Nhóm quyền</Link>,
      icon: <MenuUnfoldOutlined />,
      key: "/roles"
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
      label: <Link to={`/${PREFIX_ADMIN}/statistics`}>Tổng quan hệ thống</Link>,
      icon: <BarChartOutlined />,
      key: "/statistics",
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
        selectedKeys={[currentPath]}
      />
    </>
  )
}

export default MenuSider;