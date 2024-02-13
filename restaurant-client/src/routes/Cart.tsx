import { Link, useNavigate } from "react-router-dom";
import "../css/Cart.css";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import { useAppSelector } from "../util/hooks/hooks";
import postOrders from "@/util/api/PostOrders";
import { useAuth0 } from "@auth0/auth0-react";

// Cart Page.
const Cart = () => {
  // Get the total price of the order and the dishes from Redux State.
  const ntotal = useAppSelector((state) => state.order.total).toFixed(2);
  const cartItems = useAppSelector((state) => state.order.dishes);

  // If there are no dishes in the cart (no items were fetched from Redux) then retuen <></>.
  let componentItems;
  if (cartItems.length <= 0) {
    componentItems = <></>;
  } else {
    componentItems = cartItems.map((item, index) => {
      // Create a cart item for each dish in the cart.
      return (
        <CartItem
          key={index}
          dish={item.name}
          ingredients={item.ingredients}
          amount={item.amount}
          price={item.price}
        />
      );
    });
  }

  const accessTokenProp = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithPopup } = useAuth0();

  // Submit the order (Post to the backend) and send the user back to the home page (if authenticated).
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      loginWithPopup();
    }

    var Item = cartItems.map((item) => {
      return { dishName: item["name"], quantity: item["amount"] };
    });
    const email = user?.email as string;
    await postOrders({
      total: Number(ntotal),
      items: Item,
      email: email,
      accessTokenProp: accessTokenProp,
    });
    navigate("/");
  };

  return (
    <div className="cart--container border--1px container--width">
      <h1 className="cart--title">Order</h1>
      <Link to={"/menu"} className="cart--more">
        <Button className="w-full">Add More Items</Button>
      </Link>
      {componentItems}
      <div className="cart--submit">
        {isAuthenticated && <Button onClick={handleSubmit}>Submit</Button>}
        <h4 className="cart--total">Total: {ntotal}</h4>
      </div>
      {!isAuthenticated && (
        <div className="login--to--order">
          <p>Login to place order.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
