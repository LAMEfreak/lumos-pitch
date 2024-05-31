import { Button } from "../ui/button";
import { Video } from "lucide-react";

const SessionsButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => console.log(`sessions button clicked`)}
    >
      <Video size={18} />
    </Button>
  );
};

export default SessionsButton;
