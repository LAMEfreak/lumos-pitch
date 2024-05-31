import { Button } from "../ui/button";
import { Home } from "lucide-react";

const SessionsButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => console.log(`home button clicked`)}
    >
      <Home size={18} />
    </Button>
  );
};

export default SessionsButton;
