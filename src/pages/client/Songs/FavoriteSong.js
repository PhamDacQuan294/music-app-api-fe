import { useState } from "react";
import { favoriteSong } from "../../../services/client/songService";
import { HeartOutlined } from "@ant-design/icons";

function UseFavoriteSong({ idSong, isFavoriteSong }) {
  const [isActive, setIsActive] = useState(isFavoriteSong);


  const handleFavorite = async () => {
    const typeFavorite = isActive ? "unfavorite" : "favorite";

    try {
      const options = {
        typeFavorite: typeFavorite,
        idSong: idSong
      }

      const result = await favoriteSong(options);

      if (result.code === 200) {
        setIsActive(!isActive);
      }

    } catch (error) {
      console.error("Error when liking song:", error);
    }
  }

  return (
    <div
      className={`detail-song__action ${isActive ? "detail-song__action--heart" : ""}`}
      onClick={handleFavorite}
    >
      <span>
        <HeartOutlined className="detail-song__action-icon" />
      </span>
      <span> Bài hát yêu thích</span>
    </div>
  )
}

export default UseFavoriteSong;