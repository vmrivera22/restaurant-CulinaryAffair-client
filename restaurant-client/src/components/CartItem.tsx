import "../css/Cart.css";
import { useAppDispatch } from "../util/hooks/hooks";
import { addDish, removeDish } from "../features/order/orderSlice";

interface Props {
  dish: string;
  ingredients: string[];
  amount: number;
  price: number;
}

import { v4 as uuid } from "uuid";

// Component for each dish in the cart.
const CartItem = ({ dish, ingredients, amount, price }: Props) => {
  // Create a list item of all dish ingredients.
  const ingredient = ingredients.map((i) => {
    return <li key={uuid()}>{i}</li>;
  });

  // Increases or decreases the number of dishes in the Cart (order) if a plus or minus button are pressed.
  const dispatch = useAppDispatch();
  const handleAmountChange = (e: any) => {
    const { value } = e.target;
    if (value == "add") {
      dispatch(
        addDish({
          name: dish,
          amount: 1,
          price: price,
          ingredients: ingredients,
        })
      );
    } else {
      dispatch(removeDish({ name: dish }));
    }
  };

  return (
    <div className="cart--item--container">
      <h1 className="dish--title">{dish}</h1>
      <ul>{ingredient}</ul>
      <div className="item--quantity">
        <div className="num--items">
          <div className="button--round">
            <button
              name={dish}
              value={"subtract"}
              onClick={(e) => handleAmountChange(e)}
              className="button"
            >
              -
            </button>
          </div>
          <h3 className="item--amount">{amount}</h3>
          <div className="button--round">
            <button
              name={dish}
              value={"add"}
              onClick={(e) => handleAmountChange(e)}
            >
              +
            </button>
          </div>
        </div>
        <h4 className="item--price">{(amount * price).toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CartItem;
