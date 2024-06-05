import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import axios from "axios";
import { useEffect, useState } from "react";
import RoundsSection from "@/components/RoundsSection/RoundsSection";
import AddRound from "@/components/RoundsSection/components/AddRound";

export interface RoundProps {
  stage: string;
  target: number;
  name: string;
  description: string;
  id: number;
  startupId: number;
}

const Dashboard = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [allRounds, setAllRounds] = useState<RoundProps[]>([]);

  const getAllRounds = async () => {
    const auth0Id = user?.sub;
    const token = await getAccessTokenSilently();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}/rounds`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const sortedData: {
        stage: string;
        target: number;
        name: string;
        description: string;
        id: number;
        startupId: number;
      }[] = response.data.sort((a: { name: string }, b: { name: string }) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase

        // Sort by alphabets first
        if (isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
          return nameA.localeCompare(nameB);
        }

        // If both are numbers, sort by numbers
        if (!isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) {
          return nameA.localeCompare(nameB, "en", { numeric: true });
        }

        // If a is a number and b is a string, a should come after b
        if (!isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
          return 1;
        }

        // If a is a string and b is a number, a should come before b
        if (isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) {
          return -1;
        }

        return 0;
      });
      setAllRounds(sortedData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    getAllRounds();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <section className="p-8 flex flex-col items-center container">
        <div className="flex justify-between w-full mb-6">
          <h1 className="text-2xl mb-0">Dashboard</h1>
          {allRounds.length}
          <AddRound getAllRounds={getAllRounds} />
        </div>
        <RoundsSection allRounds={allRounds} getAllRounds={getAllRounds} />
      </section>
    )
  );
};
export default Dashboard;
