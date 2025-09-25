import { Button, Card, Col, Row } from "antd";
import "./FilterStatus.scss";
import SearchSong from "../Search";

function FilterStatus({ filterStatus, onFilterChange, onSearchResult }) {
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
                  onClick={() => onFilterChange(item.status)}
                  className={`filter-list__item ${item.class === "active" ? "filter-list__item--active" : ""}`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </Col>

          <Col lg={12}>
            <SearchSong onSearchResult={onSearchResult}/>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default FilterStatus;