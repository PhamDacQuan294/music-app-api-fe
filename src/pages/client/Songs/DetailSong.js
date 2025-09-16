/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getDetailSong } from "../../../services/songService";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import {HeartOutlined } from "@ant-design/icons";
import  AudioPlayer from "../../../components/client/APlayer/APlayer";

import "./Song.scss";
import UseLikeSong from "./LikeSong";

function DetailSong() {
  const [data, setData] = useState(null);
  const [likes, setLikes] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const song = await getDetailSong(params.slugSong);
      setData(song);
      setLikes(song.song.like);
    };
    fetchApi();
  }, [likes]);

  if (!data) return null; // tránh render khi chưa có dữ liệu

  return (
    <div className="detail-song">
      <Row>
        <Col xxl={24} xl={24}>

          <div className="detail-song__title">
            {data?.song?.title}
          </div>

          <div className="detail-song__actions">
            <div className="detail-song__action detail-song__action--time">
              20/10/2023
            </div>
            <div className="detail-song__action detail-song__action--singer">
              {data?.singer?.fullName}
            </div>
            <div className="detail-song__action detail-song__action--topic">
              {data?.topic?.title}
            </div>
            <div className="detail-song__action detail-song__action--listen">
              <span>{data?.song?.listen} lượt nghe</span>
            </div>
            <UseLikeSong idSong={data.song._id} like={data.song.like}/>
            <div
              className={`detail-song__action detail-song__action--heart ${
                data?.song?.isFavoriteSong ? "detail-song__action--heart-active" : ""
              }`}
              data-favorite={data?.song?.id}
            >
              <span className="detail-song__action-icon detail-song__action-heart">
                <HeartOutlined /> 
              </span>
              <span>
                Bài hát yêu thích
              </span>
            </div>
          </div>

          <div className="detail-song__play">
            <div className="detail-song__avatar">
              <img src={data.song.avatar} alt="Logo"></img>
            </div>
            <div className="detail-song__audio">
              <AudioPlayer song={data.song} singer={data.singer} />
            </div>
          </div>

          <div className="detail-song__desc">
              <div className="detail-song__desc-label">
                Mô tả
              </div>
              <div 
                className="detail-song__desc-text" 
                dangerouslySetInnerHTML={{ __html: data.song.description }}>
              </div>
          </div>

          <div className="detail-song__desc">
              <div className="detail-song__desc-label">
                Lời bài hát
              </div>
              <div 
                className="detail-song__desc-text"
                dangerouslySetInnerHTML={{ __html: data.song.lyrics }}
              >
              </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailSong;
