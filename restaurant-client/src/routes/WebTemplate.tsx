import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../css/SharedStyles.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@/components/auth/Loading";
import { useAppDispatch } from "../util/hooks/hooks";
import { addToken } from "../features/token/tokenSlice";
import { addEmail } from "../features/order/orderSlice";
import { useMemo } from "react";

// Template where all other routes derive from.
const WebTemplate = () => {
  const { getAccessTokenSilently, isLoading, user, isAuthenticated } =
    useAuth0();
  const dispatch = useAppDispatch();

  // When authenticated fetch an access token/user and save their state in Redux State.
  useMemo(() => {
    const fetchData = async () => {
      try {
        if (isLoading) {
          // Wait for authetication to load.
          return <Loading />;
        }
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently(); // Get access token to send to the backend to be able to make orders.
          dispatch(addToken({ token: accessToken })); // Set token to Redux State.
          const email = user?.email as string;
          dispatch(addEmail({ email: email })); // Set email to Redux State.
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, isAuthenticated]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default WebTemplate;
