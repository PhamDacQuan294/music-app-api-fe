/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchService } from "../../../services/admin/searchService";
import "./Search.scss"

function Search({ onSearchResult, type, placeholder }) {
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState([]);
  const navigate = useNavigate();

  // Khi gõ từ khóa thì gọi API suggest
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (keyword.trim()) {
        const data = await searchService(`${type}`, keyword);
        setSuggests(data?.[type]);
      } else {
        setSuggests([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleSearch = async () => {
    if (keyword) {
      const data = await searchService(`${type}`, keyword);
      if (data?.[type]) {
        onSearchResult(data?.[type]);
      }
      navigate(`/admin/${type}?search-${type}=${encodeURIComponent(keyword)}`);

      setSuggests([]);
    } else {
      navigate(`/admin/${type}`)
      const data = await searchService(`${type}`, keyword);
      if (data?.[type]) {
        onSearchResult(data?.[type]);
      }
    }
  }

  return (
    <>
      <div className="form-search">
        <Input.Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch} // xử lý cả Enter + click nút
          enterButton="Tìm"
          size="middle"
          placeholder={placeholder}
        />
        {suggests.length > 0 &&
          <div className="search__suggest">
            <div className="search__suggest-list">
              {suggests.map((item) => (
                <div
                  key={item._id}
                  className="search__suggest-item"
                  onClick={() => {
                    setKeyword(item.title);      // set lại input value
                    onSearchResult([item]);      // click gợi ý nó trả về bái hát đó
                    setSuggests([]);             // clear gợi ý
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="search__suggest-image">
                    <img src={item.avatar} alt={item.title} />
                  </div>
                  <div className="search__suggest-info">
                    <div className="search__suggest-title">{item.title}</div>
                    <div className="search__suggest-singer">
                      {item.infoSinger?.fullName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Search;