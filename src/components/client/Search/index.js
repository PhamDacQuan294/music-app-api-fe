import { MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      // Nếu không nhập gì thì chuyển về trang yêu thích
      navigate(`/favorite-songs`);
      return;
    }

    navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`)
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
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>
      </div>
    </>
  )
}

export default SearchResult;