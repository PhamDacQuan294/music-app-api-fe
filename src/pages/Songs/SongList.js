import { Row } from "antd";
import SongItem from "./SongItem";

function SongList(props) {
  const { songs } = props;

  return (
    <>
      <div className="songs-list">
        <Row>
          {songs && 
            songs.map((item) => (
              <SongItem song={item} key={item._id} />
            ))
          }
        </Row>
      </div>
    </>
  )
}

export default SongList;