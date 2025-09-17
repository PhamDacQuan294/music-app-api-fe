import { Button, Col } from "antd";
import { Link } from "react-router-dom";

function TopicItem(props) {
  const { item } = props;

  return (
    <>
      <Col xxl={8} xl={8} lg={12} md={24}>
        <div className="topic-item">
          <div className="topic-item__avatar">
            <Link to={`/songs/${item.slug}`}>
              <img src={item.avatar} alt="Logo" />
            </Link>
          </div>
          <div className="topic-item__content">
            <div className="topic-item__title">{item.title}</div>
            <div className="topic-item__description">{item.description}</div>
            <Link to={`/songs/${item.slug}`}>
              <Button>Xem chi tiết</Button>
            </Link>
          </div>
        </div>
      </Col>
    </>
  )
}

export default TopicItem;