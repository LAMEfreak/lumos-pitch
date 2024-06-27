import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: `${
          import.meta.env.VITE_SOME_LOCAL_SERVER
        }/dashboard/overview`,
      },
      // authorizationParams: {
      //   screen_hint: "signup",
      // },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="rounded-md py-3 mt-2 px-28 bg-blue-600 hover:bg-blue-700 transition-all duration-300"
    >
      Get started
    </button>
  );
};

export default LoginButton;
