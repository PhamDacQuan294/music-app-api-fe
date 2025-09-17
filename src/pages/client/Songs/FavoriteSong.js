import { useEffect, useState } from "react";
import { getListFavoriteSong } from "../../../services/client/songService";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

function FavoriteSong() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFavoriteSong = async () => {
      const data = await getListFavoriteSong();
      setData(data.favoriteSongs);
    }

    fetchFavoriteSong();
  }, [])


  return (
    <>
      <div className="favorite-songs">
        <Row>
          {data &&
            data.map((item, index) => (
              <Col xxl={12} xl={12} lg={12} md={24} key={index}>
                <div className="song-item">
                  <div className="song-item__image">
                    <Link to={`/songs/detail/${item.infoSong.slug}`}>
                      <img src={item.infoSong.avatar} alt="Logo" />
                    </Link>
                  </div>
                  <div className="song-item__body">
                    <Link to={`/songs/detail/${item.infoSong.slug}`}>
                      <div className="song-item__title">
                        {item.infoSong.title}
                      </div>
                    </Link>
                    <div className="song-item__singer">
                      {item.infoSinger.fullName}
                    </div>
                    <div className="song-item__heart">
                      <span>
                        <HeartOutlined style={{ color: "#B70021", margin: "10px 0px 10px 0px"}}/>
                      </span>
                      <span style={{ color: "#B70021"}}> Bài hát yêu thích</span>
                    </div>
                    <div className="song-item__time">
                      |  20/10/2023
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  )
}


export default FavoriteSong;