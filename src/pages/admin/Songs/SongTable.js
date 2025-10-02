import { Table, Image, Tooltip, Tag, Space, Card, Row, Col, Button, message } from "antd";
import FilterStatus from "../../../components/admin/FilterStatus";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { hanleStatusChange } from "../../../components/admin/ChangeStatus";
import { updateSongStatus } from "../../../actions/admin/songs.actions";

function SongTable() {
  const dispatch = useDispatch();
  const { listSongs } = useSelector((state) => state.admin.songs);
  const { listTopics } = useSelector((state) => state.admin.topics);
  const { listSingers } = useSelector((state) => state.admin.singers);
  const [messageApi, contextHolder] = message.useMessage();

  const dataSource = (listSongs?.songs || []).map((song) => {
    const singer = listSingers?.singers?.find((s) => s._id === song?.singerId);
    const topic = listTopics?.topics?.find((t) => t._id === song?.topicId);

    return {
      ...song,
      singerName: singer ? singer.fullName : "Không rõ",
      topicName: topic ? topic.title : "Không rõ",
    };
  });
  
  const changeStatusSong = (song) => {
    dispatch(updateSongStatus(song))
  }

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
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <>
          {record.status === "active" ? (
            <>
              <Tooltip title="Chủ đề chưa bị dừng hoạt động" color="green">
                <Tag 
                  color="green"
                  style={{ cursor: "pointer" }} 
                  onClick={() => hanleStatusChange(record, "songs", messageApi, changeStatusSong)}
                >
                  Active
                </Tag>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Chủ đề đã bị dừng hoạt động" color="red">
                <Tag 
                  color="red"
                  style={{ cursor: "pointer" }} 
                  onClick={() => hanleStatusChange(record, "songs", messageApi, changeStatusSong)}
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
      render: (_, record) => {
        return <>
          <Space>
          </Space>
        </>
      }
    },
  ];


  return (
    <>
      {contextHolder}

      <FilterStatus
        filterStatus={listSongs?.filterStatus || []}     
        placeholder="Tìm kiếm bài hát..."
        searchType="songs"
        list={listSongs?.songs || []}
      />

      <Card>
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
      </Card>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey="_id"
      />
    </>
  )
}

export default SongTable;