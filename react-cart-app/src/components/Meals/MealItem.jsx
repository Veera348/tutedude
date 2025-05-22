import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../store/cart-context';

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      amount,
      price: meal.price
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{meal.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{meal.description}</h6>
        <p className="card-text fw-bold">${meal.price.toFixed(2)}</p>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
}

export default MealItem;
