import { Button, Form, Select, Card, Row, Col, message } from "antd";

const { Option } = Select;

export const SortType = ({ songContexts }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const { sort } = form.getFieldsValue();

    const [sortKey, sortValue] = sort.split("-");

    if (!sort) {
      message.warning("Vui lòng chọn kiểu sắp xếp!");
      return;
    } else {
      songContexts.onSort(sortKey, sortValue);
      message.success("Sắp xếp thành công!");
    }
  };

  const handleClear = () => {
    form.setFieldsValue({ sort: "position-desc" });
    message.info("Đã xóa sắp xếp!");
    handleSubmit();
  };

  return (
    <Card title="Sắp xếp" className="sort-type" style={{ marginBottom: 20 }}>
      <Row>
        <Col lg={24}>
          <Form
            form={form}
            layout="inline"
            initialValues={{ sort: "position-desc" }} 
          >
            <Form.Item name="sort" style={{ width: 200 }}>
              <Select onChange={handleSubmit}>
                <Option value="position-desc">Vị trí giảm dần</Option>
                <Option value="position-asc">Vị trí tăng dần</Option>
                <Option value="title-asc">Tiêu đề A - Z</Option>
                <Option value="title-desc">Tiêu đề Z - A</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button danger onClick={handleClear}>
                Clear
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
