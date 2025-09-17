import { useState } from "react";
import { LikeOutlined } from "@ant-design/icons";
import { likeSong } from "../../../services/client/songService";

function ButtonLikeSong({ idSong, like }) {
  const [likes, setLikes] = useState(like);
  const [isActive, setIsActive] = useState(false);

  const handleLike = async () => {
    const typeLike = isActive ? "dislike" : "like";

    try {
      const options = {
        typeLike: typeLike,
        idSong: idSong
      }
      
      const result = await likeSong(options);
      
      if (result.code === 200) {
        setLikes(result.like)
      }

      setIsActive(!isActive);

    } catch (error) {
      console.error("Error when liking song:", error);
    }
  }

  return (
    <div
      className={`detail-song__action ${isActive ? "detail-song__action--active" : ""}`}
      onClick={handleLike}
    >
      <span className="detail-song__action-like">
        <LikeOutlined className="detail-song__action-icon"/>
      </span>
      <span className="detail-song__action-like">{likes} thích</span>
    </div>
  );
}

export default ButtonLikeSong;
