/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Image, Tooltip, Tag, Space, Card, Row, Col, Button, message, InputNumber } from "antd";
import FilterStatus from "../../../components/admin/FilterStatus";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { hanleStatusChange } from "../../../components/admin/ChangeStatus";
import { updateSongStatusAction } from "../../../actions/admin/songs.actions";
import DeleteSong from "./DeleteSong";
import EditSong from "./EditSong";
import DetailSong from "./DetailSong";
import { useEffect, useState } from "react";
import { ChangeStatusMulti } from "../../../components/admin/ChangeMulti";
import { getListSong } from "../../../services/admin/songService";
import { pagination } from "../../../actions/admin/pagination.action";
import usePaginationQuery from "../../../hooks/admin/usePaginationQuery.hook";
import { SortType } from "../../../components/admin/Sort";

function SongTable() {
  const dispatch = useDispatch();
  const { listSongs } = useSelector((state) => state.admin.songs);
  const { listTopics } = useSelector((state) => state.admin.topics);
  const { listSingers } = useSelector((state) => state.admin.singers);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [, setPage] = usePaginationQuery();

  const [positions, setPositions] = useState({});

  useEffect(() => {
    const pos = {};
    listSongs.songs.forEach(song => {
      pos[song._id] = song.position;
    });
    setPositions(pos);
  }, [listSongs.songs])
  
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
    dispatch(updateSongStatusAction(song))
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
      render: (position, record) => (
        <InputNumber
          min={1}
          value={positions[record._id]} 
          onChange={(value) => {
            setPositions(prev => ({
              ...prev,
              [record._id]: value,
            }));

            // Cập nhật selectedRowKeys theo logic cũ
            const updatedSelectedRowKeys = selectedRowKeys.map((key) => {
              const [id] = key.split("-");
              if (id === record._id) {
                return `${id}-${value}`; 
              }
              return key;
            });

            setSelectedRowKeys(updatedSelectedRowKeys);
          }}
          style={{ width: "70px" }}
        />
      ),
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
            <DeleteSong record={record} messageApi={messageApi} />
            <EditSong record={record} />
            <DetailSong record={record} />
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

      <SortType 
        fetchData={getListSong}
        type="SONGS"
        params={["", "", ""]}
      />

      <Card title="Danh sách">
        <Row>
          <Col sm={16}>
            <ChangeStatusMulti
              selectedRowKeys={selectedRowKeys} 
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
        <Row>
          <Col sm={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              className="custom-table"
              pagination={{
                current: listSongs?.pagination?.currentPage,
                pageSize: listSongs?.pagination?.limitItems,
                total: listSongs?.pagination?.totalPage * listSongs?.pagination?.limitItems,
                onChange: async (page, _) => {
                  try {
                    setPage(page); 
                    const response = await getListSong("", "", page);
                    dispatch(pagination("SONGS", response));
                  } catch (error) {
                    console.error("Fetch songs failed", error);
                  }
                },
                showSizeChanger: false, 
              }}
              rowSelection={{
                onChange: (newSelectedRowKeys) => {
                  setSelectedRowKeys(newSelectedRowKeys);
                },
              }}
            />
          </Col>
        </Row>
      </Card>

    </>
  )
}

export default SongTable;