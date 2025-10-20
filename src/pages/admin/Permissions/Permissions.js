import { Button, Card, Checkbox, Table } from "antd";
import Title from "antd/es/skeleton/Title";
import { useSelector } from "react-redux";
import "./Permissions.scss";

function RolePermissions() {
  const { listRoles } = useSelector((state) => state.admin.roles);

  // Danh sách vai trò (các cột)
  const roles = listRoles?.records?.map((r) => r.title) || [];

  // Danh sách tính năng (các hàng)
  const features = [
    { group: "Quản lý chủ đề", actions: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá"] },
    { group: "Quản lý bài hát", actions: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá"] },
    { group: "Nhóm quyền", actions: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá", "Phân quyền"] },
  ];

  const dataSource = [];

  features.forEach((feature) => {
    dataSource.push({
      feature: <b>{feature.group}</b>,
      key: feature.group,
    });

    feature.actions.forEach((action) => {
      const row = {
        feature: action,
        key: `${feature.group}-${action}`
      };
      roles.forEach((role) => {
        row[role] = <Checkbox />;
      });
      dataSource.push(row);
    });
  });

  // Cấu hình cột
  const columns = [
    {
      title: "Tính năng",
      dataIndex: "feature",
      key: "feature",
    },
    ...roles.map((role) => ({
      title: role,
      dataIndex: role,
      key: role,
      align: "center",
    })),
  ];


  return (
    <Card>
      <Title level={3}>Phân quyền</Title>

      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        className="permission-table"
      />

      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Button type="primary">Cập nhật</Button>
      </div>
    </Card>
  );
}

export default RolePermissions;