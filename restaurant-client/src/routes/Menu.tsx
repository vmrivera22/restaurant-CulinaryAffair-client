import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import "../css/Menu.css";

// Dish Menu Page.
const Menu = () => {
  // State to store fetched dishes.
  const [dishes, setDishes] = useState<
    {
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
    }[]
  >();

  // Fetch the dishes once.
  useEffect(() => {
    fetch("https://culinaryaffair.azurewebsites.net/api/Dishes/")
      .then((data) => data.json())
      .then((response) => setDishes(response));
  }, []);

  // Map through dishes fetched and create a dish component for each.
  const dishList = dishes?.map((dish) => {
    return (
      <Dish
        key={dish.name}
        id={dish.id}
        name={dish.name}
        description={dish.description}
        image={dish.image}
        price={dish.price}
      />
    );
  });
  return (
    <div className="menu--container">
      <h1 className="title">Menu</h1>
      {dishList}
    </div>
  );
};

export default Menu;
