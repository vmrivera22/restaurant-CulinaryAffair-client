import { createBrowserRouter } from "react-router-dom";
import WebTemplate from "./routes/WebTemplate";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Cart from "./routes/Cart";
import Locations from "./routes/Locations";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { useEffect, useState } from "react";
import Loading from "./components/auth/Loading";

const FetchAuth = () => {
  const [auth, setAuth] = useState({ domain: "", clientId: "", audience: "" });
  useEffect(() => {
    fetch("https://culinaryaffair.azurewebsites.net/api/Settings/auth")
      .then((data) => data.json())
      .then((response) => setAuth(response));
  }, []);
  if (auth.domain == "") {
    return <Loading />;
  }
  return (
    <Auth0Provider
      domain={auth.domain}
      clientId={auth.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth.audience,
      }}
    >
      <Provider store={store}>
        <WebTemplate></WebTemplate>
      </Provider>
    </Auth0Provider>
  );
};

const App = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <FetchAuth />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/locations",
          element: <Locations />,
        },
      ],
    },
  ]);
};

export default App;
