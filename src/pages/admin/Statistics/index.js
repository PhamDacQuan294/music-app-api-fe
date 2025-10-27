import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { getListSongStatitics } from '../../../services/admin/statiticsService';

const Statistics = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListSongStatitics();
        if (res && Array.isArray(res.songs)) {
          setSongs(res.songs);
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
      }
    };
    fetchData();
  }, []);

  const totalSongs = songs.length;
  const totalListen = songs.reduce((sum, s) => sum + (s.listen || 0), 0);
  const totalLike = songs.reduce((sum, s) => sum + (s.like || 0), 0);

  const listenChart = songs.map((s) => ({
    type: s.title,
    listen: s.listen,
  }));

  const likeListenChart = songs.flatMap((s) => [
    { type: s.title, category: 'Lượt nghe', value: s.listen },
    { type: s.title, category: 'Lượt thích', value: s.like },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>Tổng quan hệ thống</h1>

      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col span={8}>
          <Card title="Tổng bài hát" variant="filled">
            <h2>{totalSongs}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng lượt nghe" variant="filled">
            <h2>{totalListen}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng lượt thích" variant="filled">
            <h2>{totalLike}</h2>
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Card title="Tỷ lệ lượt nghe các bài hát" variant="borderless">
            <Pie
              data={listenChart}
              angleField="listen"
              colorField="type"
              radius={0.8}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="So sánh lượt nghe và lượt thích" variant="borderless">
            <Column
              data={likeListenChart}
              xField="type"
              yField="value"
              seriesField="category"
              legend={{ position: 'top' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
