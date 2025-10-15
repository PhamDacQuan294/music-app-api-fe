import { Card, Col, Row, Table, Image, Tooltip, Tag, Space } from "antd";
import { useSelector } from "react-redux";
import DeleteSinger from "./DeleteSinger";
import DetailSinger from "./DetailSinger";
import EditSinger from "./EditSinger";
import FilterStatus from "../../../components/admin/FilterStatus";

function SingerTable() {
  const { listSingers } = useSelector((state) => state.admin.singers);

  const dataSource = (listSingers?.singers || []).map((singer) => {
    return {
      ...singer
    }
  });

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ca sĩ",
      dataIndex: "fullName",
      key: "fullName"
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
      )
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
            <DeleteSinger/>
            <EditSinger />
            <DetailSinger />
          </Space>
        </>
      }
    }
  ];

  return (
    <>
      <FilterStatus 
        filterStatus={listSingers?.filterStatus || []}
        placeholder="Tìm kiếm ca sĩ"
        searchType="singers"
        list={listSingers?.singers || []}
        searchKey="fullName"
      />

      <Card title="Danh sách">
        <Row>
          <Col sm={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              className="custom-table"
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default SingerTable;