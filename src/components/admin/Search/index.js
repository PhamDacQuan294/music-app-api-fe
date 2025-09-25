import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchService } from "../../../services/admin/searchService";

function Search({ onSearchResult, type, placeholder }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (keyword) {
      const data = await searchService(`${type}`, keyword);
      if (data?.[type]) {
        onSearchResult(data?.[type]);
      }
      navigate(`/admin/${type}?search-${type}=${encodeURIComponent(keyword)}`);
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
      </div>
    </>
  )
}

export default Search;