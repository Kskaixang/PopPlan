import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

function CreateEventPage() {
  // 狀態變數
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [price, setPrice] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState('');
  const [status, setStatus] = useState('draft');
  const [tags, setTags] = useState(['']);
  const [customTags, setCustomTags] = useState([]);

  // 處理提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image_url', imageUrl);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    formData.append('registration_deadline', registrationDeadline);
    formData.append('price', price);
    formData.append('max_participants', maxParticipants);
    formData.append('status', status);
    formData.append('tags', tags);
    customTags.forEach(tag => formData.append('custom_tags', tag));

    try {
      const response = await fetch('http://localhost:8080/api/createEvent', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('活動創建成功');
      } else {
        console.error('創建活動失敗');
      }
    } catch (error) {
      console.error('錯誤:', error);
    }
  };

  // 增加自訂標籤
  const addCustomTag = () => {
    if (customTags.length < 4) {
      setCustomTags([...customTags, '']);
    }
  };

  // 處理自訂標籤的變更
  const handleCustomTagChange = (index, value) => {
    const updatedTags = [...customTags];
    updatedTags[index] = value;
    setCustomTags(updatedTags);
  };

  return (
    <Container>
      <h2 className="my-4">創建活動</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>活動標題</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入活動標題"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formImage">
              <Form.Label>活動封面圖</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImageUrl(e.target.files[0])}
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>活動介紹</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="輸入活動詳細介紹"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formLocation">
              <Form.Label>活動地點</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入地點"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formStartTime">
              <Form.Label>活動開始時間</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formEndTime">
              <Form.Label>活動結束時間</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formRegistrationDeadline">
              <Form.Label>報名截止時間</Form.Label>
              <Form.Control
                type="datetime-local"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formPrice">
              <Form.Label>報名費用</Form.Label>
              <Form.Control
                type="number"
                placeholder="報名費用"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formMaxParticipants">
              <Form.Label>最大報名人數</Form.Label>
              <Form.Control
                type="number"
                placeholder="最大人數"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formStatus">
              <Form.Label>活動狀態</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">草稿</option>
                <option value="published">已發布</option>
                <option value="completed">已結束</option>
                <option value="canceled">已取消</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formTags">
              <Form.Label>標籤</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入主標籤 (必填)"
                value={tags[0]}
                onChange={(e) => setTags([e.target.value])}
                required
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Label>自訂標籤</Form.Label>
            <div className="d-flex flex-wrap">
              {customTags.map((tag, index) => (
                <InputGroup key={index} className="mb-2 me-2" style={{ width: 'auto' }}>
                  <FormControl
                    type="text"
                    placeholder={`自訂標籤 ${index + 1}`}
                    value={tag}
                    onChange={(e) => handleCustomTagChange(index, e.target.value)}
                  />
                </InputGroup>
              ))}
              {customTags.length < 4 && (
                <Button variant="outline-primary" onClick={addCustomTag}>+ 新增標籤</Button>
              )}
            </div>
          </Col>
        </Row>

        <Button variant="primary" type="submit">創建活動</Button>
      </Form>
    </Container>
  );
}

export default CreateEventPage;
