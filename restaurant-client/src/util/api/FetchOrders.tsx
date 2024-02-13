interface Order {
  total: number;
  email: string;
  items: { dishName: string; quantity: number }[];
  created: string;
}

interface Props {
  email: string;
  accessTokenProp: string;
}

const getUserOrders = async ({ email, accessTokenProp }: Props) => {
  try {
    const ordersResponse = await fetch(
      `https://culinaryaffair.azurewebsites.net/api/Orders/${email}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessTokenProp}`,
        },
      }
    );
    if (ordersResponse == null) {
      return null;
    }
    return (await ordersResponse.json()) as Order[];
  } catch (e: any) {
    console.log(e.message);
  }
};

export default getUserOrders;
