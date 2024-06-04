import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";

const Sessions = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <section className="p-8 flex flex-col items-center align-middle">
        <span className="text-2xl mb-4">Sessions</span>
      </section>
    )
  );
};
export default Sessions;
