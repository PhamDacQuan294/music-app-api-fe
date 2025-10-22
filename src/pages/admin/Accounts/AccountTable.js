import { Button, Card, Image, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/skeleton/Title";
import { useSelector } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Accounts.scss";

function AccountTable() {
  const { listAccounts } = useSelector((state) => state.admin.accounts);
  const navigate = useNavigate();

  const dataSource = (listAccounts?.accounts || []).map((account) => {
    return {
      ...account
    }
  });

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        avatar ? (
          <Image
            src={avatar}
            alt="avatar"
            width={80}
            height={60}
            style={{ border: "2px solid #f0f0f0" }}
          />
        ) : (
          <span style={{ color: "#999" }}>No image</span>
        )
      )
    },
    {
      title: "Phân quyền",
      dataIndex: ["role", "title"],
      key: "role",
      align: "center",
      render: (role) => <Tag color="blue">{role || "Chưa có"}</Tag>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        return <>
          {record.status === "active" ? (
            <>
              <Tooltip title="Tài khoản chưa bị dừng hoạt động" color="green">
                <Tag
                  color="green"
                  style={{ cursor: "pointer" }}
                >
                  Active
                </Tag>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Tài khoản đã bị dừng hoạt động" color="red">
                <Tag
                  color="red"
                  style={{ cursor: "pointer" }}
                >
                  InActive
                </Tag>
              </Tooltip>
            </>
          )}
        </>
      }
    },
    {
      title: "Hành động",
      key: "actions",
    }
  ];

  return (
    <Card className="accounts-list">
      <div className="accounts-list__header">
        <Title level={3}>Danh sách tài khoản</Title>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => navigate("/admin/accounts/create")}
        >
          Thêm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
}

export default AccountTable;