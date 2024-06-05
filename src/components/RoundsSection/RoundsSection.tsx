import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ManageRounds from "./components/ManageRounds";

const RoundsSection = () => {
  const [value, setValue] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const [currentRound, setCurrentRound] = useState<{
    stage: string;
    target: number;
    name: string;
    description: string;
    id: number;
    startupId: number;
  }>();
  const [existingRounds, setExistingRounds] = useState<
    {
      stage: string;
      target: number;
      name: string;
      description: string;
      id: number;
      startupId: number;
    }[]
  >([]);

  console.log(existingRounds);
  console.log(currentRound, "selected");

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
      setExistingRounds(response.data);
      setCurrentRound(response.data[0]);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRounds();
  }, []);

  useEffect(() => {
    setCurrentRound(existingRounds.find((round) => round.name === value));
  }, [value]);

  return (
    <main className="flex flex-col w-full">
      {existingRounds && currentRound ? (
        <section className="border dark:bg-gradient-to-br from-[#020417] to-[#2b021a] relative flex flex-col text-left p-10 rounded-lg">
          <div className="absolute right-10 top-9">
            <div className="flex gap-4">
              <Select
                value={value}
                onValueChange={(value) => {
                  setValue(value);
                  setCurrentRound(
                    existingRounds.find((round) => round.name === value)
                  );
                }}
                disabled={!existingRounds.length}
              >
                <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
                  <SelectValue
                    placeholder={currentRound?.name || "Select round"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {existingRounds.map((round) => {
                    return (
                      <SelectItem value={round.name}>{round.name}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <ManageRounds
                currentRound={currentRound}
                setCurrentRound={setCurrentRound}
              />
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-2xl font-semibold mr-6"> {currentRound?.name}</p>
            <p className="text-xs align-middle px-3 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-950">
              {currentRound?.stage}
            </p>
          </div>
          <p className="mt-6 line-clamp-2 dark:text-gray-500 max-w-[70ch]">
            {currentRound?.description}
          </p>
          <div className="grid gap-10 mt-10 grid-col-2 lg:grid-cols-4">
            <div className="dark:bg-green-900 dark:bg-opacity-40 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-md dark:text-green-500 font-medium">
                  Raised
                </p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(0)}
              </p>
              {/* <p>{investorCount}</p> */}
            </div>
            <div className="dark:bg-blue-900 dark:bg-opacity-40 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-md dark:text-blue-400 font-medium">
                  Committed
                </p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(0)}
              </p>
              {/* <p>{investorCount}</p> */}
            </div>
            <div className="dark:bg-fuchsia-900 dark:bg-opacity-40 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-md dark:text-fuchsia-400 font-medium">
                  Target Size
                </p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(currentRound?.target || 0)}
              </p>
              {/* <p>{investorCount}</p> */}
            </div>
            <div className="dark:bg-cyan-900 dark:bg-opacity-40 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-md dark:text-cyan-400 font-medium">
                  Investors
                </p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4">12</p>
              {/* <p>{investorCount}</p> */}
            </div>
          </div>
        </section>
      ) : (
        <section className="border dark:bg-gradient-to-br from-[#020417] to-[#2b021a] relative text-center justify-center flex flex-col h-96 p-10 rounded-lg">
          <p className="text-gray-400">Create a new round</p>
        </section>
      )}
    </main>
  );
};

export default RoundsSection;
