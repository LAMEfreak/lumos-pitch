import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const ErrorBoundary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-white text-5xl font-medium">Oops!</h1>
      <p className="text-lg mt-8 w-[50ch] text-gray-400">
        The page you are looking for does not exist. Redirecting you back to the
        homepage...
      </p>
      <ThreeDots
        visible={true}
        height="80"
        width="60"
        color="#fff"
        radius="12"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
export default ErrorBoundary;
