/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "antd";
import "./Search.scss"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { resetSearchAction, searchAction } from "../../../actions/admin/search.actions"

function Search2({ placeholder, type }) {
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [skipSearch, setSkipSearch] = useState(false);
  const { list } = useSelector((state) => state.admin[type]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (skipSearch) {
      setSkipSearch(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (keyword.trim()) {
        dispatch(searchAction(keyword.trim(), type));
        // Lọc có chứa keyword
        const filtered = list[type].filter(item =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) // Kiểm tra nếu title chứa keyword
        );
        setSuggests(filtered); // Cập nhật gợi ý đã lọc
      } else {
        setSuggests([]);
        dispatch(resetSearchAction(type));
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword, dispatch]);


  const handleSearch = async () => {
    if (keyword.trim()) {
      dispatch(searchAction(keyword.trim(), type));
    } else {
      dispatch(resetSearchAction(type));
    }
  }

  return (
    <>
      <div className="form-search">
        <Input.Search
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch} 
          enterButton="Tìm"
          size="middle"
          allowClear={true}
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
                    setSkipSearch(true);
                    setKeyword(item.title);      // set lại input value
                    dispatch(searchAction(item.title, type)); // click gợi ý nó trả về bái hát đó
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

export default Search2;