import { Carousel, Col, Row } from "antd";
import music1 from "../../../images/music1.jpg";
import music2 from "../../../images/music2.jpg";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <>
      <Row>
        <Col xs={24}>
          <div className="slider">
            <Carousel autoplay dotPosition="top" dots={false} effect="fade">
              <div className="slider__item">
                <Link to="/song/1">
                  <img src={music1} alt="Logo" />
                </Link>
              </div>
              <div className="slider__item">
                <Link to="/song/2">
                  <img src={music2} alt="Logo" />
                </Link>
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>

      {/* Most Liked Songs */}
      <div className="most-liked-songs">
        <Row>
          <Col xxl={8} xl={8} lg={12} md={24}>
            <div className="most-liked-songs__item">
              <div className="most-liked-songs__image">
                <Link to="/song/1">
                  <img src={music1} alt="Logo" />
                </Link>
              </div>
              <div className="most-liked-songs__content">
                <div className="most-liked-songs__title">
                  App1
                </div>
                <div className="most-liked-songs__subtitle">
                  Lorem ipsum
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={24}>
            <div className="most-liked-songs__item">
              <div className="most-liked-songs__image">
                <Link to="/song/1">
                  <img src={music1} alt="Logo" />
                </Link>
              </div>
              <div className="most-liked-songs__content">
                <div className="most-liked-songs__title">
                  App1
                </div>
                <div className="most-liked-songs__subtitle">
                  Lorem ipsum
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={24}>
            <div className="most-liked-songs__item">
              <div className="most-liked-songs__image">
                <Link to="/song/1">
                  <img src={music1} alt="Logo" />
                </Link>
              </div>
              <div className="most-liked-songs__content">
                <div className="most-liked-songs__title">
                  App1
                </div>
                <div className="most-liked-songs__subtitle">
                  Lorem ipsum
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* End Most Liked Songs */}

    </>
  )
}

export default Dashboard;