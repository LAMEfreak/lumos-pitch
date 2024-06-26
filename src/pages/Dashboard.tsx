import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import RoundsSection from "@/components/RoundsSection/RoundsSection";
import AddRound from "@/components/RoundsSection/components/AddRound";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RoundInvestorsSection from "@/components/RoundsSection/RoundInvestorsSection/RoundInvestorsSection";
import RoundInvestorsProvider from "@/utilities/context/RoundInvestorsProvider";

export interface RoundProps {
  id: number;
  stage: string;
  target: number;
  name: string;
  description: string;
  startupId: number;
}

export type NullableRoundProps = RoundProps | null;

const Dashboard = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [allRounds, setAllRounds] = useState<NullableRoundProps[]>([]);
  const [value, setValue] = useState("");
  const [selectedRound, setSelectedRound] = useState<NullableRoundProps>(
    allRounds[0] || null
  );
  
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
  }, []);

  useEffect(() => {
    getAllRounds();
  }, []);

  // HERE IS THE CODE THAT SETS THE DROPDOWN OPTION TO THE FIRST ENTRY BY DEFAULT
  useEffect(() => {
    if (allRounds.length > 0) {
      setSelectedRound(allRounds[0]);
      // Provide a default value of an empty string if allRounds[0]?.name is undefined
      setValue(allRounds[0]?.name || "");
    } else {
      setSelectedRound(null);
    }
  }, [allRounds]);
  // console.log(user);

  return isAuthenticated && selectedRound ? (
    <section className="p-8 flex flex-col items-center container">
      <div className="flex justify-between align-middle w-full -mt-2">
        <h1 className="text-2xl mb-0">Dashboard</h1>
        <div className="flex gap-4">
          <Select
            value={value}
            onValueChange={(value) => {
              setValue(value);
              setSelectedRound(
                allRounds.find((round) => round?.name === value) ?? null
              );
            }}
            disabled={allRounds.length === 0}
          >
            <SelectTrigger className="w-[220px] focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder={"Select round"} />
            </SelectTrigger>
            <SelectContent>
              {allRounds.map((round) => {
                return (
                  <SelectItem
                    value={round?.name || "No rounds"}
                    key={round?.id}
                  >
                    {round?.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <AddRound getAllRounds={getAllRounds} />
        </div>
      </div>
      <Tabs defaultValue="overview" className="w-full flex flex-col mt-4">
        <div className="self-start">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <RoundsSection
            selectedRound={selectedRound}
            getAllRounds={getAllRounds}
          />
        </TabsContent>
        <TabsContent value="investors">
          <RoundInvestorsProvider selectedRoundId={selectedRound.id}>
            <RoundInvestorsSection selectedRoundId={selectedRound.id} />
          </RoundInvestorsProvider>
        </TabsContent>
      </Tabs>
    </section>
  ) : (
    <div>
      <section className="p-8 flex flex-col items-center container">
        <div className="flex justify-between align-middle w-full -mt-2">
          <h1 className="text-2xl mb-0">Dashboard</h1>
          <div className="flex gap-4">
            <Select
              value={value}
              onValueChange={(value) => {
                setValue(value);
                setSelectedRound(
                  allRounds.find((round) => round?.name === value) ?? null
                );
              }}
              disabled={allRounds.length === 0}
            >
              <SelectTrigger className="w-[220px] focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={"Select round"} />
              </SelectTrigger>
              <SelectContent>
                {allRounds.map((round) => {
                  return (
                    <SelectItem
                      value={round?.name || "No rounds"}
                      key={round?.id}
                    >
                      {round?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <AddRound getAllRounds={getAllRounds} />
          </div>
        </div>
      </section>
      <div className="container max-h-screen">
        <div className="border-dashed border-2 border-gray-800 flex justify-center h-[70vh] rounded-lg text bg-opacity-5 bg-blue-900">
          <p className="px-6 py-4 rounded-xl text-gray-400 self-center">
            Add investors or a new funding round
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
