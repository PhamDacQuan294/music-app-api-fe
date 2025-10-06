import { Table, Image, Tooltip, Tag, Space, Card, Row, Col, Button, InputNumber } from "antd";
import DeleteTopic from "./DeleteTopic";
import EditTopic from "./EditTopic";
import DetailTopic from "./DetailTopic";
import { useSelector } from "react-redux";
import FilterStatus from "../../../components/admin/FilterStatus";
import { SortType } from "../../../components/admin/Sort";
import { getListTopic } from "../../../services/admin/topicsService";
import { ChangeStatusMulti } from "../../../components/admin/ChangeMulti";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";

function TopicTable() {
  const { listTopics } = useSelector((state) => state.admin.topics);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const pos = {};
    listTopics.topics.forEach(topic => {
      pos[topic._id] = topic.position;
    });
    setPositions(pos);
  }, [listTopics.topics]);

  const dataSource = (listTopics?.topics || []).map((topic) => {
    return {
      ...topic,
    }
  });

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
          <span style={{ color: "#999" }}>No image</span>
        )
       
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
      render: (_, record) => (
        <InputNumber 
          min={1}
          value={positions[record._id]} 
          onChange={(value) => {
            setPositions(prev => ({
              ...prev,
              [record._id]: value,
            }));

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
      )
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
      <FilterStatus 
        filterStatus={listTopics?.filterStatus || []}
        placeholder="Tìm kiếm chủ đe"
        searchType="topics"
        list={listTopics?.topics || []}
      />

      <SortType 
        fetchData={getListTopic}
        type="TOPICS"
        params={["", ""]}
      />

      <Card title="Danh sách">
        <Row>
          <Col sm={16}>
            <ChangeStatusMulti
              selectedRowKeys={selectedRowKeys}
              type="topics"
            />
          </Col>
          <Col sm={8} style={{ textAlign: "right", marginBottom: "20px" }}>
            <Link to="admin/create-topic">
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm chủ đề
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
              rowSelection={{
                onChange: (newSelectedRowKeys) => {
                  setSelectedRowKeys(newSelectedRowKeys);
                }
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default TopicTable;