import { Row } from "antd";
import TopicItem from "./TopicItem";

function TopicList(props) {
  const { topics } = props;

  return (
    <>
      <div className="topics-list">
        <Row>
          {topics.map((item) => (
            <TopicItem item={item} key={item._id} />
          ))}
        </Row>
      </div>
    </>
  )
}

export default TopicList;