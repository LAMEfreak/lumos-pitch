import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditButton from "./EditButton";

const NavBar = () => {
  
  const { user, getAccessTokenSilently } = useAuth0();
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");

  useEffect(() => {
    // Get current user details and store in state
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
        setCompanyName(result.data.name);
        setCompanyIndustry(result.data.industry);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getCurrentUser();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <section className="px-8 text-right fixed w-full overflow-hidden top-0 z-10 py-4 border-b pr-28 flex bg-background items-center justify-between">
      <div className="flex gap-4 items-center">
        <p className="font-semibold">{companyName || "Company"}</p>
        <p className="text-xs px-3 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-950">
          {companyIndustry || "Industry"}
        </p>
        <EditButton
          setCompanyName={setCompanyName}
          setCompanyIndustry={setCompanyIndustry}
        />
      </div>
      <div className="flex gap-4 items-center text-middle">
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
export default NavBar;
