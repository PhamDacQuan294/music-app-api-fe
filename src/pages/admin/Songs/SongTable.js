import { Table, Image, Tooltip, Tag, Space, Button, Card, Row, Col } from "antd";
import DeleteSong from "./DeleteSong";
import EditSong from "./EditSong";
import DetailSong from "./DetailSong";
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import FilterStatus from "../../../components/admin/FilterStatus";
import { useContext, useState } from "react";
import { SongContext } from "./index"
import { hanleStatusChange } from "../../../components/admin/ChangeStatus";
import { ChangeStatusMulti } from "../../../components/admin/ChangeMulti";
import { SortType } from "../../../components/admin/Sort";

function SongTable() {
  const songContexts = useContext(SongContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const singerList = songContexts.singers?.singers || [];

  const dataSource = songContexts.songs
    .map((song) => {
      const singer = singerList.find((s) => s._id === song.singerId);
      const topic = songContexts.topics.find((t) => t._id === song.topicId);

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
      title: "Vị trí",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        return <>
          {status === "active" ? (
            <>
              <Tooltip title="Bài hát chưa bị dừng hoạt động" color="green">
                <Tag
                  color="green"
                  style={{ cursor: "pointer" }}
                  onClick={() => hanleStatusChange(record, "songs", songContexts)}
                >
                  Active
                </Tag>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Bài hát đã bị dừng hoạt động" color="red">
                <Tag color="red" style={{ cursor: "pointer" }} onClick={() => hanleStatusChange(record, "songs", songContexts)}>
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
      <FilterStatus
        filterStatus={songContexts.filterStatus}
        onFilterChange={songContexts.onFilterChange}
        onSearchResult={songContexts.onSearchResult}
        type="songs"
        placeholder="Tìm kiếm bài hát..."
      />

      <SortType
        songContexts={songContexts}
        type="songs"
      />
      
      <Card title="Danh sách">
        <Row>
          <Col sm={16}>
            <ChangeStatusMulti 
              selectedRowKeys={selectedRowKeys} 
              songContexts={songContexts}
              type="songs"
            />
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
          pagination={{ pageSize: 5 }}
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys) => {
              setSelectedRowKeys(newSelectedRowKeys);
            },
          }}
        />
      </Card>
    </>
  )
}

export default SongTable;