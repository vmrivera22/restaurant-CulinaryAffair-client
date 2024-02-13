import { Checkbox } from "@/components/ui/checkbox";

import images from "../assets/images";

import "../css/Dish.css";

import { useAppDispatch } from "../util/hooks/hooks";
import { addDish } from "../features/order/orderSlice";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  description: string;
  image: string;
  price: number;
  id: number;
}

// Component for each dish in the Dish Menu
const Dish = ({ name, description, image, price, id }: Props) => {
  // State used to store the fetched list of ingredients.
  const [ingredients, setIngredients] = useState<{
    ingredientsString: string[];
  }>();

  // State used to keep track of what somone wants on their dish.
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredient: string; selected: boolean }[]
  >([]);

  // Fech the ingredients.
  useEffect(() => {
    fetch(`https://culinaryaffair.azurewebsites.net/api/Dishes/${id}`)
      .then((results) => results.json())
      .then((data) => setIngredients(data));
  }, [id]);

  // Once ingredients are fetched then initialize the selectedIngredients state based on the fetched ingredients.
  useEffect(() => {
    if (ingredients && ingredients.ingredientsString) {
      const initialSelectedIngredients = ingredients?.ingredientsString.map(
        (i) => ({
          ingredient: i,
          selected: true,
        })
      );
      setSelectedIngredients(initialSelectedIngredients);
    }
  }, [ingredients]);

  // Handles user select/unselect ingredients.
  const handleIngredientChange = (index: number) => {
    setSelectedIngredients((oldState) => {
      const newState = [...oldState];
      newState[index].selected = !newState[index].selected;
      return newState;
    });
  };

  // Create a checkbox for each ingredient.
  const ingred = selectedIngredients.map((i, index) => {
    return (
      <li className="ingredient--item" key={index}>
        <Checkbox
          onClick={() => handleIngredientChange(index)}
          id={`ingredient-${index}`}
          checked={i.selected}
        />
        <label
          htmlFor={`ingredient-${index}`}
          className="ingredient--item--text text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {i.ingredient}
        </label>
      </li>
    );
  });

  // If dish added to cart - save the dish to Redux State so that it can be loaded in the Cart.
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    const trueSelected = selectedIngredients.map((i) => {
      if (i.selected) {
        return i.ingredient;
      }
    }) as string[];
    if (ingredients) {
      dispatch(
        addDish({
          name: name,
          amount: 1,
          price: price,
          ingredients: trueSelected,
        })
      );
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="menu--item border--1px container--width">
          <h1 className="menu--title">{name}</h1>
          <p className="menu--description">{description}</p>
          <p className="menu--price">${price}</p>
          <img src={images({ key: image })} className="menu--image" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ul>{ingred}</ul>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleAdd}>Add to Cart</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Dish;
