import { MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchResult } from "../../../services/client/searchService";
import "./Search.scss";

function SearchSong() {
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState([]);
  const navigate = useNavigate();

  // Khi gõ từ khóa thì gọi API suggest
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (keyword.trim()) {
        const songs = await searchResult("suggest", keyword);
        setSuggests(songs.songs);
      } else {
        setSuggests([]);
      }
    }, 300); // debounce 300ms tránh spam API

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      // Nếu không nhập gì thì chuyển về trang yêu thích
      navigate(`/favorite-songs`);
      return;
    }

    navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`)

    // Khi mà qua trang kết quả rồi thì xoá suggest đi để khỏi hiển thị suggest bên trang kết quả
    setSuggests([]);
  }


  return (
    <>
      <div className="layout-default__header-left">
        <div className="layout-default__header-collapse">
          <MenuUnfoldOutlined />
        </div>
        <div className="layout-default__header-search">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch} // Nhấn Enter
            addonBefore={
              <SearchOutlined
                style={{ cursor: "pointer" }}
                onClick={handleSearch} // Bấm icon
              />
            }
            placeholder="Tìm kiếm bài hát, lời bài hát..."
          />

          {suggests.length > 0 &&
            <div className="search__suggest">
              <div className="search__suggest-list">
                {suggests.map((song) => (
                  <a
                    key={song.id}
                    className="search__suggest-item"
                    href={`/songs/detail/${song.slug}`}
                  >
                    <div className="search__suggest-image">
                      <img src={song.avatar} alt={song.title} />
                    </div>
                    <div className="search__suggest-info">
                      <div className="search__suggest-title">{song.title}</div>
                      <div className="search__suggest-singer">
                        {song.infoSinger?.fullName}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default SearchSong;