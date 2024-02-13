import { useAuth0, RedirectLoginOptions } from "@auth0/auth0-react";

interface Props {
  text?: string;
}

// Button to log the user in --- redirect the user to Auth0 authentication and return to home page after.
const LoginButton = ({ text }: Props) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button
        onClick={() =>
          loginWithRedirect({ prompt: null } as RedirectLoginOptions)
        }
      >
        {text ? text : "Sign In"}
      </button>
    )
  );
};

export default LoginButton;
