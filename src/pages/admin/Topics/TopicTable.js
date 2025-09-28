import { Table, Image, Tooltip, Tag, Space } from "antd";
import DeleteTopic from "./DeleteTopic";
import EditTopic from "./EditTopic";
import DetailTopic from "./DetailTopic";
import { useSelector } from "react-redux";
import FilterStatus2 from "../../../components/admin/FilterStatus2";

function TopicTable() {
  const { list } = useSelector((state) => state.admin.topics);

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
            <DeleteTopic record={record} />
            <EditTopic record={record} />
            <DetailTopic record={record} />
          </Space>
        </>
      }
    },
  ];

  return (
    <>
      <FilterStatus2 
        filterStatus={list?.filterStatus || []}
        placeholder="Tìm kiếm chủ đe"
        searchType="topics"
      />

      <Table dataSource={list.topics} columns={columns} rowKey="_id" />
    </>
  )
}

export default TopicTable;