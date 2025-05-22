import React, { useRef } from 'react';

function MealItemForm({ onAddToCart }) {
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = +amountInputRef.current.value;
    if (enteredAmount > 0) {
      onAddToCart(enteredAmount);
    }
  };

  return (
    <form className="d-flex align-items-center gap-2" onSubmit={submitHandler}>
      <input
        type="number"
        className="form-control w-25"
        min="1"
        max="10"
        step="1"
        defaultValue="1"
        ref={amountInputRef}
      />
      <button type="submit" className="btn btn-primary">+ Add</button>
    </form>
  );
}

export default MealItemForm;
