import { Table, Button, Card, Row, Col, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import DetailRole from "./DetailRole";

function RoleTable() {
  const { listRoles } = useSelector((state) => state.admin.roles);
  const { role } = useSelector((state) => state.admin.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const hasPermission = (perm) => role?.permissions?.includes(perm);

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Nhóm quyền",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          dangerouslySetInnerHTML={{
            __html: text || "<i>Không có mô tả</i>",
          }}
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        return <>
          <Space>
            {hasPermission("roles_delete") && (
              <DeleteRole record={record} messageApi={messageApi} />
            )}
            {hasPermission("roles_edit") && <EditRole record={record} />}
            {hasPermission("roles_view") && <DetailRole record={record} />}
          </Space>
        </>
      }
    },
  ];

  return (
    <>
      {contextHolder}

      <Card title="Danh sách nhóm quyền">
        <Row>
          <Col sm={16}>
            <h2 style={{ marginBottom: 0 }}>Nhóm quyền</h2>
          </Col>
          <Col sm={8} style={{ textAlign: "right", marginBottom: "20px" }}>
            {hasPermission("roles_create") && ( 
              <Link to="/admin/roles/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm mới nhóm quyền
                </Button>
              </Link>
            )}
          </Col>
        </Row>

        <Row>
          <Col sm={24}>
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={listRoles.records || []}
              scroll={{ x: "max-content" }}
              className="custom-table"
              locale={{
                emptyText: "Chưa có nhóm quyền nào được tạo",
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default RoleTable;
