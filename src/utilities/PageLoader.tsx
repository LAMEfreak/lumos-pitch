import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "./ThemeProvider";

const PageLoader = () => {
  // Code currently doesn't support theme obtained from system!!
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <ThreeDots
        visible={true}
        height="80"
        width="60"
        color={theme === "dark" ? "#fff" : "#000"}
        radius="8"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
export default PageLoader;
