import { Link } from "react-router-dom";
import "../css/Header.css";
import "../css/SharedStyles.css";
import GetWindow from "../util/hooks/GetWindow";
import { NavMenu } from "./NavMenu";
import menu from "../assets/menu.png";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import LogoutButton from "./auth/LogoutButton";
import LoginButton from "./auth/LoginButton";

// Header component. Present in all pages.
const Header = () => {
  const windowDimension = GetWindow(); // Get window dimensions to make the webpage more responsive.
  return (
    <header className="header--container shadow sticky shared--background white--bg">
      <ul className="header--left--links">
        <Link className="black restaurant--name" to={"/"}>
          Culinary Affair
        </Link>
      </ul>
      <ul className="header--right--links black">
        {windowDimension.windowWidth > 800 ? (
          <>
            <LogoutButton /> <LoginButton />
            <Link to={"/locations"}>Locations</Link>
            <Link className="black" to={"/menu"}>
              Menu
            </Link>
            <Link to={"/cart"}>Cart</Link>
          </>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <img src={menu} className="menu--icon" />
            </SheetTrigger>
            <NavMenu />
          </Sheet>
        )}
      </ul>
    </header>
  );
};

export default Header;
