import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingIndex = state.items.findIndex(i => i.id === action.item.id);
    const existingItem = state.items[existingIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE') {
    const existingIndex = state.items.findIndex(i => i.id === action.id);
    const existingItem = state.items[existingIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(i => i.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'DELETE') {
    const existingIndex = state.items.findIndex(i => i.id === action.id);
    const existingItem = state.items[existingIndex];
    if (!existingItem) return state;
    const updatedTotalAmount = state.totalAmount - (existingItem.price * existingItem.amount);
    const updatedItems = state.items.filter(i => i.id !== action.id);
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
}

function CartProvider({ children, onAddNotification }) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCart({ type: 'ADD', item });
    onAddNotification && onAddNotification(item);
  };

  const removeItemFromCartHandler = id => {
    dispatchCart({ type: 'REMOVE', id });
  };

  const deleteItemFromCartHandler = id => {
    dispatchCart({ type: 'DELETE', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    deleteItem: deleteItemFromCartHandler
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartProvider;
