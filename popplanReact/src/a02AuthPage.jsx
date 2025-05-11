import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import "./components/css/button.css";
function AuthPage() {
  // 控制目前是登入或註冊
  const [mode, setMode] = useState('login');

  // 表單欄位狀態
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');



  // 切換登入 / 註冊模式
  const toggleMode = (newMode) => {
    setMode(newMode);
    // 清空表單
    setUsername('');
    setEmail('');
    setPassword('');
    setCaptcha('');
  };

  // 提交處理（可接 API）
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = mode === 'login' ? '/user/login' : '/user/register';

    // 組裝要送出的資料
    const payload = mode === 'login'
      ? { email, password, captcha }
      : { email, password, username };

    try {
      const response = await fetch('http://localhost:8080' + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${mode === 'login' ? '登入' : '註冊'}成功`);
        console.log('後端回傳資料:', data);
        // 清空表單
        setMode('login');
        setUsername('');
        setEmail('');
        setPassword('');
        setCaptcha('');
        // 可導向其他頁面，例如：
        // navigate('/home');
      } else {
        alert(data.message || '操作失敗');
      }

    } catch (error) {
      console.error('錯誤:', error);
      alert('連線錯誤，請稍後再試');
    }
  };


  return (
    <Container className="mt-4 p-4 border border-gray bg-white shadow rounded" style={{ maxWidth: '400px' }}>
      {/* 頁首：登入 / 註冊切換按鈕 */}
      <Row className="mb-3 text-center">
        <Col>
          <Button
            variant={mode === 'login' ? 'outline-secondary' : 'outline-primary'}
            className="w-100 me-2 mb-2 rounded-pill shadow-sm px-3 custom-clear-button"
            onClick={() => toggleMode('login')}

          >
            登入
          </Button>
        </Col>

        <Col>
          <Button
            variant={mode === 'register' ? 'outline-secondary' : 'outline-primary'}
            className="w-100 me-2 mb-2 rounded-pill shadow-sm px-3 custom-clear-button"
            onClick={() => toggleMode('register')}
          >
            註冊
          </Button>
        </Col>
      </Row>

      {/* 表單區塊 */}
      {mode !== 'login' && (
        <Form.Group className="mb-3">
          <Form.Label>使用者名稱：</Form.Label>
          <Form.Control
            type="text"
            placeholder="請輸入使用者名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
      )}
      <Form onSubmit={handleSubmit}>
        {/* 信箱欄位 */}
        <Form.Group className="mb-3">
          <Form.Label>信箱：</Form.Label>
          <Form.Control
            type="email"
            placeholder="請輸入信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* 密碼欄位 */}
        <Form.Group className="mb-3">
          <Form.Label>密碼：</Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* 驗證碼欄位：僅登入模式顯示 */}



        {/* 驗證碼欄位：僅登入模式顯示 */}
        {mode === 'login' && (
          <Form.Group className="mb-3">
            <Form.Label>驗證碼：</Form.Label>
            <Row>
              <Col xs={7}>
                <Form.Control
                  type="text"
                  placeholder="請輸入驗證碼"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                />
              </Col>
              <Col xs={5}>
                {/* 這邊是示意用圖，你可以替換為實際的驗證碼圖片 URL */}
                <Image
                  src="https://via.placeholder.com/100x32?text=Captcha"
                  alt="驗證碼"
                  fluid
                />
              </Col>
            </Row>
          </Form.Group>
        )}

        {/* 提交 / 取消按鈕 */}
        <div className="d-flex justify-content-between">
          <Button
            className="w-100 me-2 mb-2 rounded-pill shadow-sm px-3 "
            type="submit" variant="outline-secondary">
            {mode === 'login' ? '登入' : '註冊'}
          </Button>
          <Button
            className="w-100 me-2 mb-2 rounded-pill shadow-sm px-3 "
            variant="outline-secondary" type="button" onClick={() => toggleMode(mode)}>
            取消
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AuthPage;
