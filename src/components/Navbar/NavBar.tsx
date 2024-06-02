import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getTime, getDate, User } from "./utilities";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({} as User);
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
      console.log("Updating time and date");
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time, date]);

  useEffect(() => {
    // Get current user details to store in state
    const getCurrentUser = async () => {
      const token = await getAccessTokenSilently();
      const auth0Id = user?.sub;
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentUser(result.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getCurrentUser();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <section className="px-10 text-right py-4 border-b flex justify-between">
      <div className="flex gap-4">
        <p className="font-semibold">{currentUser.name || "Company"}</p>
        <p className="text-xs px-2 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-900">
          {currentUser.industry || "Industry"}
        </p>
      </div>
      <div className="flex gap-4 text-middle">
        <p className="text-sm font-medium">{time}</p>
        <p className="text-sm">{date}</p>
      </div>
    </section>
  );
};
export default NavBar;
