/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "antd";
import "./Search.scss"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { resetSearchTopics, searchTopics } from "../../../actions/admin/search.actions";

function Search2({ placeholder }) {
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [skipSearch, setSkipSearch] = useState(false);
  const { list } = useSelector((state) => state.admin.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    if (skipSearch) {
      setSkipSearch(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (keyword.trim()) {
        dispatch(searchTopics(keyword.trim()));
        // Lọc các chủ đề có chứa keyword
        const filteredTopics = list.topics.filter(item =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) // Kiểm tra nếu title chứa keyword
        );
        setSuggests(filteredTopics); // Cập nhật gợi ý với các chủ đề đã lọc
      } else {
        setSuggests([]);
        dispatch(resetSearchTopics());
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword, dispatch]);


  const handleSearch = async () => {
    if (keyword.trim()) {
      dispatch(searchTopics(keyword.trim()));
    } else {
      dispatch(resetSearchTopics());
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
                    dispatch(searchTopics(item.title)); // click gợi ý nó trả về bái hát đó
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