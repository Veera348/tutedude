import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/CartProvider';
import Notification from './components/UI/Notification';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [notification, setNotification] = useState('');

  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);
  const showNotification = item =>
    setNotification(`Added ${item.amount} × ${item.name} to cart`);

  return (
    <CartProvider onAddNotification={showNotification}>
      {notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
      )}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main className="container my-4">
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;