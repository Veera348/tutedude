import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../store/cart-context';
// import './Cart.css';

function Cart({ onClose }) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map(item => (
        <li key={item.id} className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded">
          <div>
            <strong>{item.name}</strong> x {item.amount}<br />
            <small>${item.price.toFixed(2)}</small>
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => cartCtx.removeItem(item.id)}>-</button>
            <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => cartCtx.addItem({ ...item, amount: 1 })}>+</button>
            <button className="btn btn-sm btn-danger" onClick={() => cartCtx.deleteItem(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      <div className="modal-body">
        {cartItems}
        <div className="d-flex justify-content-between border-top pt-3 mt-3">
          <strong>Total</strong>
          <strong>{totalAmount}</strong>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
        {hasItems && <button className="btn btn-primary">Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;