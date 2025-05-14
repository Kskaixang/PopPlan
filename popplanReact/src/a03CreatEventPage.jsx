import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, InputGroup, FormControl
} from 'react-bootstrap';

const tagGroups = {
  時間: ["平日", "假日"],
  地區: ["北部", "中部", "南部", "東部", "離島", "線上"],
  活動: ["樂團", "桌遊", "偶像", "免費", "付費", "KTV", "美食", "運動", "展覽", "DIY", "語言", "學習", "動漫", "Cosplay", "宗教", "戶外", "寵物", "志工", "揪團"]
};

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [price, setPrice] = useState(0);
  const [status] = useState('draft'); // 僅創建階段使用，後續視情況開放修改

  const [selectedTags, setSelectedTags] = useState({
    時間: '',
    地區: '',
    活動: ''
  });
  const [mainTag, setMainTag] = useState('');
  const [customTags, setCustomTags] = useState(["", "", "", ""]);

  const addCustomTag = () => {
    if (customTags.length < 4) {
      setCustomTags([...customTags, '']);
    }
  };

  const handleCustomTagChange = (index, value) => {
    const updatedTags = [...customTags];
    updatedTags[index] = value;
    setCustomTags(updatedTags);
  };

  const handleTagChange = (group, value) => {
    setSelectedTags({ ...selectedTags, [group]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 後端POST邏輯，包含 imageUrl 與其他欄位
    console.log({ title, imageUrl, description, location, startTime, maxParticipants, price, status, selectedTags, mainTag, customTags });
  };

  return (
    <Container className="my-4">
      <h2>創建活動</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={12}>
            <div className="border p-3 mb-2 text-center bg-light" style={{ height: '400px' }}>預覽圖</div>
            <Form.Control
              type="file"
              onChange={(e) => setImageUrl(e.target.files[0])}
              accept="image/*"
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>活動標題</Form.Label>
          <Form.Control
            type="text"
            placeholder="活動標題"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>活動介紹</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="活動介紹"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>活動地點</Form.Label>
          <Form.Control
            type="text"
            placeholder="活動地點"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>活動開始日期</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Label>最大人數</Form.Label>
            <Form.Control
              type="number"
              placeholder="最大人數"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label>標籤Tag</Form.Label>
          {Object.entries(tagGroups).map(([group, options]) => (
            <Col md={3} key={group}>
              <Form.Select
                value={selectedTags[group] || ''}
                onChange={(e) => handleTagChange(group, e.target.value)}
              >
                <option value="">選擇{group}</option>
                {options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Col>
          ))}
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="主題tag（必填）"
              value={mainTag}
              onChange={(e) => setMainTag(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={6} md={3}>
              <InputGroup className="mb-2">
                <FormControl
                  placeholder="自訂（選填）"
                  value={customTags[index] || ""}
                  onChange={(e) => handleCustomTagChange(index, e.target.value)}
                />
              </InputGroup>
            </Col>
          ))}
        </Row>


        <Row className="mb-4">

          <Col md={4}>
            <Form.Label>報名費用</Form.Label>
            <Form.Control
              type="number"
              placeholder="報名費用"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>

          <Col md={4}>
            <Form.Label>活動狀態</Form.Label>
            <Form.Select value={status} disabled>
              <option value="draft">草稿</option>
              <option value="published">已發布</option>
              <option value="completed">已結束</option>
              <option value="canceled">已取消</option>
            </Form.Select>
            {/* 僅創建階段為草稿，其他情境未來啟用 */}
          </Col>
          <Col md={4}>
            <Form.Label>　</Form.Label>
            <Button
              type="submit"
              variant="outline-secondary"
              className="w-100 custom-clear-button"
            >
              創建活動
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateEventPage;
