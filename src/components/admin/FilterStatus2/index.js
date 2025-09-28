import { Button, Card, Col, Row } from "antd";
import "./FilterStatus.scss";
import { useDispatch } from "react-redux";
import { active, inActive, resetStatus } from "../../../actions/admin/filterStatus.actions";
import Search2 from "../Search2";

function FilterStatus2({ filterStatus, placeholder }) {
  const dispatch = useDispatch();

  const handleClick = (status) => {
    switch (status) {
      case "active":
        dispatch(active());   // gọi action ACTIVE
        break;
      case "inactive":
        dispatch(inActive()); // gọi action INACTIVE
        break;
      default:
        dispatch(resetStatus()); // RESET_STATUS
        break;
    }
  };

  return (
    <>
      <Card title="Bộ lọc và tìm kiếm" className="filter-status">
        <Row>
          <Col lg={12}>
            <div className="filter-list">
              {filterStatus.map((item, index) => (
                <Button 
                  key={index} 
                  button-status={item.status} 
                  onClick={() => handleClick(item.status)}
                  className={`filter-list__item ${item.class === "active" ? "filter-list__item--active" : ""}`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </Col>

          <Col lg={12}>
            <Search2 placeholder={placeholder}/>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default FilterStatus2;