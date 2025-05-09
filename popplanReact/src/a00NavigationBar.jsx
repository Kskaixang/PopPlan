import { useState } from 'react';
import { Navbar, Container, Form, FormControl, Button, Nav, Offcanvas, Image } from 'react-bootstrap';
import { BsPencil, BsHeart, BsClock, BsPersonCircle, BsSearch } from 'react-icons/bs'; // 引入放大鏡圖示

function NavigationBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 登入狀態
  const [notificationCount, setNotificationCount] = useState(5); // 假設收藏報名有5個通知
  const [showSearch, setShowSearch] = useState(false); // 控制搜尋框顯示

  return (
    <>
      <Navbar expand="md" className="py-3" style={{ backgroundColor: '#e3f2fd' }}>
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold text-primary d-none d-md-block p-0 me-2">
            PopPlan
          </Navbar.Brand>
          <Navbar.Brand href="#" className="fw-bold text-primary d-md-none p-0 me-2">
            PP
          </Navbar.Brand>

          {/* 搜尋框 */}
          <div className="d-md-flex align-items-center">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="搜尋活動"
                aria-label="Search"
              />
              <Button variant="outline-success"><BsSearch /></Button>
            </Form>
          </div>


          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>選單</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* 創建活動入口 */}
                <Nav.Link href="#createEvent">
                  <BsPencil className="me-2" /> 創建活動
                </Nav.Link>

                {/* 收藏報名入口 */}
                <Nav.Link href="#myRegistrations">
                  <BsHeart className="me-2" />
                  {notificationCount > 0 && (
                    <span className="badge bg-danger ms-1">{notificationCount}</span>
                  )}
                  收藏報名
                </Nav.Link>

                {/* 歷史紀錄入口 */}
                <Nav.Link href="#history">
                  <BsClock className="me-2" /> 歷史紀錄
                </Nav.Link>

                {/* 登入 / 註冊或用戶選單 */}
                {isLoggedIn ? (
                  <Nav.Link href="#profile">
                    <Image
                      src="https://via.placeholder.com/40"
                      roundedCircle
                      className="me-2"
                    />
                    用戶
                  </Nav.Link>
                ) : (
                  <>
                    <Nav.Link href="#login" onClick={() => setShowLogin(true)}>
                      登入
                    </Nav.Link>
                    <Nav.Link href="#register">註冊</Nav.Link>
                  </>
                )}
              </Nav>

              {/* 當 showLogin 為 true，顯示登入表單 */}
              {showLogin && (
                <div className="login-form-container">
                  {/* 這裡可以是你的登入表單元件 */}
                  <Button onClick={() => setShowLogin(false)}>關閉登入表單</Button>
                </div>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;