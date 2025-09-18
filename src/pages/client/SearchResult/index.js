import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchResult } from "../../../services/client/searchService";
import { Col, Row } from "antd";
import ButtonLikeSong from "../../../components/client/Buttons/ButtonLikeSong";
import "./SearchResult.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SearchResult() {
  const [result, setResults] = useState([]);
  const query = useQuery();
  const keyword = query.get("keyword");

  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        const data = await searchResult("result", keyword);
        setResults(data.songs);
      }
    };
    fetchData();
  }, [keyword]);

  return (
    <>
      <div className="search-result">
        <h2>
          Kết quả tìm kiếm
        </h2>

        <Row>
          {result &&
            result.map((item, index) => (
              <Col xxl={12} xl={12} lg={12} md={24} key={index}>
                <div className="song-item">
                  <div className="song-item__image">
                    <Link to={`/songs/detail/${item.slug}`}>
                      <img src={item.avatar} alt="Logo" />
                    </Link>
                  </div>
                  <div className="song-item__body">

                    <Link to={`/songs/detail/${item.slug}`}>
                      <div className="song-item__title">
                        {item.title}
                      </div>
                    </Link>

                    <div className="song-item__singer">
                      {item.infoSinger.fullName}
                    </div>

                    <ButtonLikeSong idSong={item._id} like={item.like} />

                    <div className="song-item__time">
                      |  20/10/2023
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  )
}

