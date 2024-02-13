import { useAuth0 } from "@auth0/auth0-react";

// Button to log the user out --- return to home page after.
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <button onClick={() => logout()}>Sign Out</button>;
};

export default LogoutButton;
