import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import FetchOrders from "../util/api/FetchOrders";

import { useAppSelector } from "../util/hooks/hooks";

import { v4 as uuid } from "uuid";

import "../css/RecentOrders.css";

// Component to display a users recent orders when logged in.
export function RecentOrders() {
  const { user } = useAuth0();

  // Get the access token from the Redux state
  const accessTokenProp = useAppSelector((state) => state.token.token);

  // State to keep a list of orders.
  const [orders, setOrders] = useState<
    {
      email: string;
      total: number;
      items: { dishName: string; quantity: number }[];
      created: string;
    }[]
  >([]);

  // Fetch the orders if the access torken prop changes.
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (accessTokenProp == "") {
          // If the access token is not in the Redux state then return nothing.
          return;
        }
        const email = user?.email as string;
        const Orders = await FetchOrders({
          email: email,
          accessTokenProp: accessTokenProp,
        });
        if (Orders != null) {
          setOrders(Orders);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    if (user) {
      fetchUserOrders();
    }
  }, [accessTokenProp, user]);

  // Create a JSX Component of the recent orders.
  const orderList = orders?.map((o, index) => {
    const orderItems = o.items.map((item) => {
      // Create a JSX Component for the ingredients of the current order.
      return (
        <div className="order--items" key={uuid()}>
          <h3>{item.dishName}</h3>
          <p>x {item.quantity}</p>
        </div>
      );
    });
    return (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <div className="recent--orders flex-start">
                <h2>Email: {o.email}</h2>
                {orderItems}
                <p className="order--total">Total: {o.total}</p>
                <div className="order--date white--bg">
                  <p>Date: {o.created}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel className="w-full max-w-xs z-1">
      <CarouselContent>{orderList}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
