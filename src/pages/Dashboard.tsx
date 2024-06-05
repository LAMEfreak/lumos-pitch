import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import axios from "axios";
import { useEffect } from "react";
import RoundsSection from "@/components/RoundsSection/RoundsSection";
import AddRound from "@/components/RoundsSection/components/AddRound";

const ToastWithTitle = () => {
  const { toast } = useToast();

  return (
    <Button
      variant="default"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }}
    >
      Show Toast
    </Button>
  );
};

const Dashboard = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    // To send the auth0Id to the backend to create a new user
    const sendAuth0Id = async () => {
      const body = {
        auth0Id: user?.sub,
        email: user?.email,
      };
      const token = await getAccessTokenSilently();
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(result);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    sendAuth0Id();
  }, [getAccessTokenSilently, user?.sub, user?.email]);

  const getOne = async () => {
    const investorId = 2;
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${investorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <section className="p-8 flex flex-col items-center container">
        <div className="flex justify-between w-full mb-6">
          <h1 className="text-2xl mb-0">Dashboard</h1>
          <AddRound />
        </div>
        {/* <span className="mt-4">
          {user?.name ? user.name : "No name!!"} is logged in.
        </span>
        <ToastWithTitle />

        <button
          onClick={() => {
            getOne();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Get 1 investor
        </button> */}
        <RoundsSection />
      </section>
    )
  );
};
export default Dashboard;
