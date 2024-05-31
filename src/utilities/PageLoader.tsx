import { ThreeDots } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div>
      <ThreeDots
        visible={true}
        height="80"
        width="60"
        color="#fff"
        radius="8"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
export default PageLoader;
