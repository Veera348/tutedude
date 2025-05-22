import React from 'react';
import MealItem from './MealItem';

const DUMMY_MEALS = [
  { id: 'm1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 },
  { id: 'm2', name: 'Burger', description: 'Juicy grilled burger', price: 14.99 },
  { id: 'm3', name: 'Pizza', description: 'Cheesy pizza', price: 18.99 },
];

function Meals() {
  return (
    <section className="container my-5">
      <div className="row">
        {DUMMY_MEALS.map(meal => (
          <div className="col-md-6 col-lg-4 mb-4" key={meal.id}>
            <MealItem meal={meal} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Meals;
