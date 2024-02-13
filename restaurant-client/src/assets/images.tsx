import imgTacos from "./tacos.png";
import imgBurrito from "./burrito.png";
import imgBurger from "./burger.png";
import imgCeviche from "./ceviche.png";
import imgQuesadilla from "./quesadilla.png";
import imgSteak from "./steak.png";

interface Props {
  key: string;
}

const images = ({ key }: Props) => {
  switch (key) {
    case "taco": {
      return imgTacos;
    }
    case "burrito": {
      return imgBurrito;
    }
    case "burger": {
      return imgBurger;
    }
    case "ceviche": {
      return imgCeviche;
    }
    case "quesadilla": {
      return imgQuesadilla;
    }
    case "steak": {
      return imgSteak;
    }
  }
};

export default images;
