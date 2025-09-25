import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchService } from "../../../services/admin/searchService";
import { getListSong } from "../../../services/admin/songService";

function SearchSong({ onSearchResult }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (keyword) {
      const data = await searchService("search-song", keyword);
      if (data.newSongs) {
        onSearchResult(data.newSongs.flat());
      }
      navigate(`/admin/songs?search-song=${encodeURIComponent(keyword)}`);
    } else {
      const data = await getListSong();
      if (data.songs) {
        onSearchResult(data.songs);
      }
      navigate(`/admin/songs`)
    }
  }

  return (
    <>
      <div className="form-search">
        <Input.Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch} // xử lý cả Enter + click nút
          allowClear
          enterButton="Tìm"
          size="middle"
          placeholder="Tìm kiếm bài hát"
        />
      </div>
    </>
  )
}

export default SearchSong;