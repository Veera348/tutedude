import React, { useContext } from 'react';
import CartContext from '../store/cart-context';

function Header({ onShowCart }) {
  const cartCtx = useContext(CartContext);
  const count = cartCtx.items.reduce((sum, i) => sum + i.amount, 0);
  const total = cartCtx.totalAmount.toFixed(2);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">ReactMeals</span>
        <button className="btn btn-outline-primary" onClick={onShowCart}>
          Cart ({count}) - ${total}
        </button>
      </div>
    </nav>
  );
}

export default Header;