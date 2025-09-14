import { Button, Col } from "antd";
import { Link } from "react-router-dom";
import { API_PREFIX } from "../../components/contants"; 

function TopicItem(props) {
  const { item } = props;

  return (
    <>
      <Col xxl={8} xl={8} lg={12} md={24}>
        <div className="topic-item">
          <div className="topic-item__avatar">
            <Link to={`/songs/${item._id}`}>
              <img src={item.avatar} alt="Logo" />
            </Link>
          </div>
          <div className="topic-item__content">
            <div className="topic-item__title">{item.title}</div>
            <div className="topic-item__description">{item.description}</div>
            <Link to={`${API_PREFIX}/songs/${item._id}`}>
              <Button>Xem chi tiết</Button>
            </Link>
          </div>
        </div>
      </Col>
    </>
  )
}

export default TopicItem;