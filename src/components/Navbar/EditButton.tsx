import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const EditButton = ({
  setCompanyName,
  setCompanyIndustry,
}: {
  setCompanyName: (name: string) => void;
  setCompanyIndustry: (industry: string) => void;
}) => {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;

    if (!name && !industry) {
      toast({
        variant: "destructive",
        title: "Wait a second...",
        description: "No company details added",
      });
      return;
    }

    const body = {
      name,
      industry,
    };
    
    try {
      await axios.put(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(result.data);
      setCompanyName(name);
      setCompanyIndustry(industry);
      setName("");
      setIndustry("");
      setIsOpen(false);
      toast({
        description: "Your profile has been updated.",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={16} className="text-gray-500 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setIsOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Company Profile</DialogTitle>
            <DialogDescription>{""}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-8 py-4">
            <div className="grid grid-cols-4 items-center gap-6">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={name}
                className="col-span-3"
                placeholder="Enter company name"
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Input
                id="industry"
                value={industry}
                className="col-span-3"
                placeholder="Enter industry type"
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="mt-2"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
