/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Checkbox, Table, message, Typography, Spin } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import "./Permissions.scss";
import { updatePermissions } from "../../../services/admin/rolesService";
import { useFeaturesData } from "./PermissionsFeatures";

const { Title } = Typography;

function RolePermissions() {
  const { listRoles } = useSelector((state) => state.admin.roles);
  const roles = listRoles?.records || [];

  const features = useFeaturesData();

  const [permissionsState, setPermissionsState] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cập nhật lại state khi roles thay đổi
  useEffect(() => {
    if (roles.length > 0) {
      const initialState = roles.map((role) => ({
        id: role._id,
        permissions: role.permissions || [],
      }));
      setPermissionsState(initialState);
    }
  }, [roles]);

 
  // Toggle checkbox
  const handleCheckboxChange = (roleIndex, permissionKey, checked) => {
    setPermissionsState((prev) => {
      const newState = [...prev];
      const role = { ...newState[roleIndex] };

      if (checked) {
        role.permissions = [...new Set([...role.permissions, permissionKey])];
      } else {
        role.permissions = role.permissions.filter((p) => p !== permissionKey);
      }

      newState[roleIndex] = role;
      return newState;
    });
  };


  // Tạo dataSource cho bảng
  const dataSource = useMemo(() => {
    const rows = [];

    features.forEach((feature) => {
      rows.push({
        key: feature.group,
        feature: <b>{feature.group}</b>,
      });

      feature.actions.forEach((action, i) => {
        const row = {
          key: `${feature.group}-${action}`,
          feature: feature.labels[i],
        };

        roles.forEach((role, rIndex) => {
          const isChecked = permissionsState[rIndex]?.permissions?.includes(action);
          row[role.title] = (
            <Checkbox
              checked={isChecked}
              onChange={(e) =>
                handleCheckboxChange(rIndex, action, e.target.checked)
              }
            />
          );
        });

        rows.push(row);
      });
    });

    return rows;
  }, [roles, permissionsState, features]);

 
  //  Cấu hình cột
  const columns = [
    {
      title: "Tính năng",
      dataIndex: "feature",
      key: "feature",
    },
    ...roles.map((role) => ({
      title: role.title,
      dataIndex: role.title,
      key: role.title,
      align: "center",
    })),
  ];


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await updatePermissions({ permissions: JSON.stringify(permissionsState) });
      message.success(data.message);
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card>
      <Title level={3}>Phân quyền</Title>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          bordered
          className="permission-table"
          scroll={{ x: true }}
        />

        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
      </Spin>
    </Card>
  );
}

export default RolePermissions;
