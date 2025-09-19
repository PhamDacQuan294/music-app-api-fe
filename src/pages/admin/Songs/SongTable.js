import { Table, Image, Tooltip, Tag, Space, Button } from "antd";
import DeleteSong from "./DeleteSong";
import EditSong from "./EditSong";
import DetailSong from "./DetailSong";
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";

function SongTable(props) {
  const { songs } = props;

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Image
          src={avatar}
          alt="avatar"
          width={80}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Ca sĩ",
      // dataIndex: "title",
      // key: "title"
    },
    {
      title: "Chủ đề",
      // dataIndex: "title",
      // key: "title"
    },
    {
      title: "Ví trị",
      // dataIndex: "title",
      // key: "title"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <>
          {status === "active" ? (
            <>
              <Tooltip title="Chủ đề chưa bị dừng hoạt động" color="green">
                <Tag color="green">
                  Active
                </Tag>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Chủ đề đã bị dừng hoạt động" color="red">
                <Tag color="red">
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
      render: (_, record) => {
        return <>
          <Space>
            <DeleteSong record={record} />
            <EditSong record={record} />
            <DetailSong record={record} />
          </Space>
        </>
      }
    },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Link to="/admin/create-song">
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm bài hát
          </Button>
        </Link>
      </div>

      <Table dataSource={songs} columns={columns} rowKey="_id" />
    </>
  )
}

export default SongTable;