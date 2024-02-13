interface Props {
  total: number;
  items: { dishName: string; quantity: number }[];
  email: string;
  accessTokenProp: string;
}

const postOrders = async ({ total, items, accessTokenProp, email }: Props) => {
  try {
    await fetch(`https://culinaryaffair.azurewebsites.net/api/Orders/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessTokenProp}`,
      },
      body: JSON.stringify({
        total: total,
        items: items,
        email: email,
      }),
    });
    return;
  } catch (e: any) {
    console.log(e.message);
  }
};

export default postOrders;
