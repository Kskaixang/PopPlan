import { useState } from 'react';
import {
  Navbar, Container, Form, FormControl,
  Button, Offcanvas, Nav, InputGroup
} from 'react-bootstrap';
import LoginForm from './components/LoginForm'; // 👈 引入登入表單元件

function NavigationBar() {
  const [showLogin, setShowLogin] = useState(false); // 👈 狀態控制

  return (
    <>
      <Navbar expand="md" style={{ backgroundColor: '#e3f2fd' }} className="py-3">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold text-primary">PopPlan</Navbar.Brand>

          <Form className="d-flex flex-grow-1 mx-3">
            <InputGroup>
              <FormControl
                type="search"
                placeholder="搜尋活動"
                aria-label="Search"
              />
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </Form>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>使用者選單</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Button
                  variant="outline-primary"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setShowLogin(true)} // 👈 顯示登入表單
                >
                  登入
                </Button>
                <Button variant="primary">註冊</Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* ✅ 當 showLogin 為 true，顯示登入表單 */}
      <Container>{showLogin && <LoginForm onClose={() => setShowLogin(false)} />}</Container>
    </>
  );
}

export default NavigationBar;
