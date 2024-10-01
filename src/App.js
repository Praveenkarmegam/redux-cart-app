import React from 'react';
import { Container, Row, Col, Button, Card, Image, Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from './store';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">MyShop</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart ({cart.totalQuantity})
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container className="mt-5">
        <Typography variant="h4" className="mb-4 text-center" style={{ fontWeight: 'bold' }}>
          Your Shopping Cart
        </Typography>
        
        {/* Empty Cart Message */}
        {cart.products.length === 0 ? (
          <div className="empty-cart text-center">
            <Image src="https://cdn.vox-cdn.com/thumbor/Z1AJT-w0yhZwojdvVs_haJ3-jHE=/0x0:2032x1355/1400x1050/filters:focal(1016x678:1017x679)/cdn.vox-cdn.com/uploads/chorus_asset/file/22863258/akrales_210917_4760_0175.jpg" roundedCircle className="mb-4" />
            <Typography variant="h6" className="text-center">
              Your cart is empty. Start shopping now!
            </Typography>
            <Button href="#home" variant="primary" className="mt-3">Go to Shop</Button>
          </div>
        ) : (
          <>
            <Row>
              {cart.products.map(product => (
                <Col md={12} key={product.id} className="mb-4">
                  <Card className="p-3 cart-item-card shadow-sm">
                    <Row>
                      <Col md={2}>
                        <Image src={product.image} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Card.Body>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text className="text-muted">{product.description}</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={4} className="d-flex flex-column align-items-end justify-content-between">
                        <div className="d-flex align-items-center">
                          <Button variant="outline-secondary" size="sm" onClick={() => dispatch(decreaseQuantity(product.id))}>-</Button>
                          <span className="mx-3">{product.quantity}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => dispatch(increaseQuantity(product.id))}>+</Button>
                        </div>
                        <Typography variant="h6" className="mb-2">Total: ${product.totalAmount.toFixed(2)}</Typography>
                        <Button variant="link" className="text-danger" onClick={() => dispatch(removeItem(product.id))}>
                          <FontAwesomeIcon icon={faTrashAlt} /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Typography variant="h6" className="font-weight-bold">Subtotal: ${cart.totalPrice.toFixed(2)}</Typography>
                <Typography variant="h6" className="text-muted">Shipping: Free</Typography>
              </Col>
              <Col md={6} className="text-end">
                <Typography variant="h5" className="font-weight-bold">Total: ${cart.totalPrice.toFixed(2)}</Typography>
                <Button variant="success" className="mt-2">Proceed to Checkout</Button>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center py-4 mt-5 bg-dark text-light">
        <Typography variant="subtitle1">© 2024 MyShop. All Rights Reserved.</Typography>
        <Typography variant="body2">Built with React, Redux, and Bootstrap.</Typography>
      </footer>
    </div>
  );
};

export default App;
