import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import axios from "axios";

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

  const postData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const body = {
        name: "Bearer",
        type: "VC",
        company: "test",
        stage: "Series A",
        email: "test@gmail.com",
      };
      const post = await axios.post(`http://localhost:8080/investors`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(post);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <section className="p-8 flex flex-col items-center align-middle">
        <span className="text-2xl mb-4">Dashboard</span>
        <span className="mt-4">{user?.name} is logged in.</span>
        <ToastWithTitle />
        <button
          onClick={() => {
            postData();
          }}
        >
          123
        </button>
      </section>
    )
  );
};
export default Dashboard;
