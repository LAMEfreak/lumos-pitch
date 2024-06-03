import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import InvestorsMasterList from "@/components/InvestorsMasterList/InvestorsMasterList";

const Investors = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <section className="flex flex-col items-center p-2 align-middle">
        <InvestorsMasterList />
      </section>
    )
  );
};
export default Investors;
