import { Col } from "antd";
import { Link } from "react-router-dom";

function SongItem(prop) {
  const { song } = prop;

  return (
    <>
      <Col xxl={12} xl={12} lg={12} md={24}>
        <div className="song-item">
          <div className="song-item__image">
            <Link to={`/songs/detail/${song.slug}`}>
              <img src={song.avatar} alt="Logo" />
            </Link>
          </div>
          <div className="song-item__body">
            <Link to={`/songs/detail/${song.slug}`}>
              <div className="song-item__title">
                {song.title}
              </div>
            </Link>
            <div className="song-item__singer">
              {song.infoSinger.fullName}
            </div>
            <div className="song-item__like">
              {song.like}
            </div>
            <div className="song-item__time">
              Hom nay
            </div>
          </div>
        </div>
      </Col>
    </>
  )
}

export default SongItem;