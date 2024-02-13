import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

import "../css/NavMenu.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";

import { v4 as uuid } from "uuid";

const menuItems = [
  {
    title: "Cart",
    dest: "/cart",
  },
  {
    title: "Our Menu",
    dest: "/menu",
  },
  {
    title: "Locations",
    dest: "/locations",
  },
];

// Component of navigation menu. Replaces a static menu on the header if screen size is less than 800px. Triggers when menu icon is clicked.
export function NavMenu() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="items-center gap-4 menu--component">
          <LoginButton />
          <LogoutButton />
        </div>
        <MenuComponent />
      </div>
      <SheetFooter></SheetFooter>
    </SheetContent>
  );
}

const MenuComponent = () => {
  return menuItems.map((item) => {
    return (
      <div className="items-center gap-4 menu--component" key={uuid()}>
        <SheetClose asChild>
          <Link to={item.dest}>{item.title}</Link>
        </SheetClose>
      </div>
    );
  });
};
