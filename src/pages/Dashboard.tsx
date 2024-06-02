import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import axios from "axios";
import { useEffect } from "react";

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

  const postData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const body = {
        name: "German",
        type: "Angel",
        company: "test",
        stage: "Series A",
        email: "fofo@gmail.com",
        auth0Id: user?.sub,
      };
      const post = await axios.post(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const deleteOne = async () => {
    const investorToDelete = 4;
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.delete(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/investors/${investorToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const getOne = async () => {
    const investorId = 7;
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
  }

  const getAll = async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${user?.sub}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const editOne = async () => {
    const investorId = 4;
    try {
      const token = await getAccessTokenSilently();
      const body = {
        name: "Koko",
        type: "VC",
        company: "test",
        stage: "Series A",
        email: "koko@gmail.com",
      };
      const post = await axios.put(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${investorId}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
        <span className="mt-4">
          {user?.name ? user.name : "No name!!"} is logged in.
        </span>
        <ToastWithTitle />
        <button
          onClick={() => {
            postData();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Create an investor
        </button>
        <button
          onClick={() => {
            deleteOne();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Delete investor
        </button>
        <button
          onClick={() => {
            getOne();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Get 1 investor
        </button>
        <button
          onClick={() => {
            getAll();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Get all investors tied to the user
        </button>
        <button
          onClick={() => {
            editOne();
          }}
          className="p-2 bg-blue-800 mb-4"
        >
          Edit 1 investor{" "}
        </button>
      </section>
    )
  );
};
export default Dashboard;
