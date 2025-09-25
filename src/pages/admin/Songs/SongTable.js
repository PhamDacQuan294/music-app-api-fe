import { Table, Image, Tooltip, Tag, Space, Button, Card, Row, Col } from "antd";
import DeleteSong from "./DeleteSong";
import EditSong from "./EditSong";
import DetailSong from "./DetailSong";
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import FilterStatus from "../../../components/admin/FilterStatus";

function SongTable(props) {
  const { songs, filterStatus, topics, singers, onReload, onFilterChange, onSearchResult, messageApi } = props;

  const singerList = singers?.singers || [];

  const dataSource = songs
    .map((song) => {
      const singer = singerList.find((s) => s._id === song.singerId);
      const topic = topics.find((t) => t._id === song.topicId);

      return {
        ...song,
        singerName: singer ? singer.fullName : "Không rõ",
        topicName: topic ? topic.title : "Không rõ",
      };
    })

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
        avatar ? (
          <Image
            src={avatar}
            alt="avatar"
            width={80}
            height={60}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        ) : (
          <span style={{ color: "#aaa" }}>Không có ảnh</span>
        )
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Ca sĩ",
      dataIndex: "singerName",
      key: "singerName"
    },
    {
      title: "Chủ đề",
      dataIndex: "topicName",
      key: "topicName"
    },
    {
      title: "Ví trị",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <>
          {status === "active" ? (
            <>
              <Tooltip title="Bài hát chưa bị dừng hoạt động" color="green">
                <Tag color="green">
                  Active
                </Tag>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Bài hát đã bị dừng hoạt động" color="red">
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
            <DeleteSong record={record} onReload={onReload} messageApi={messageApi} />
            <EditSong record={record} topics={topics} singers={singers} onReload={onReload} />
            <DetailSong record={record} />
          </Space>
        </>
      }
    },
  ];

  
  return (
    <>
      <FilterStatus filterStatus={filterStatus} onFilterChange={onFilterChange} onSearchResult={onSearchResult}/>

      <Card title="Danh sách">
        <Row>
          <Col sm={16}>
            ok
          </Col>

          <Col sm={8} style={{ textAlign: "right", marginBottom: "20px" }}>
            <Link to="/admin/create-song">
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm bài hát
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          className="custom-table"
        />
      </Card>
    </>
  )
}

export default SongTable;