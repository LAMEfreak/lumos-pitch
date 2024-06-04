import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext } from "react";
import { InvestorsListContext } from "../../../utilities/context/InvestorsListContext";
import { useToast } from "@/components/ui/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ActionMenu = ({ investor }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { fetchData } = useContext(InvestorsListContext)!;
  const { toast } = useToast();

  // Investor details of row selected
  const {
    company: currentCompany,
    type: currentType,
    email: currentEmail,
    stage: currentStage,
    name: currentName,
  } = investor;

  const [name, setName] = useState(currentName);
  const [type, setType] = useState(currentType);
  const [company, setCompany] = useState(currentCompany);
  const [stage, setStage] = useState(currentStage);
  const [email, setEmail] = useState(currentEmail);
  // console.log(investor);

  const deleteRecord = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      toast({
        description: "Record succesfully deleted",
      });
      fetchData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const editRecord = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const body = {
        name,
        type,
        company,
        email,
        stage,
      };
      console.log(`body`);

      const result = await axios.put(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("result", result);
      toast({
        description: "Record succesfully updated",
      });
      fetchData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <AlertDialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsEditDialogOpen(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="dark:hover:bg-red-900 cursor-pointer"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editRecord(investor.id);
                setIsEditDialogOpen(false);
              }}
            >
              <DialogHeader>
                <DialogTitle>Edit Investor Details</DialogTitle>
                <DialogDescription>Update an existing record</DialogDescription>
              </DialogHeader>
              <div className="grid gap-8 py-4 mt-2">
                <div className="grid grid-cols-4 items-center gap-6 my-3">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    className="col-span-3"
                    placeholder="Enter investor name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    className="col-span-3"
                    placeholder="Enter company name"
                    onChange={(e) => setCompany(e.target.value)}
                  />

                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={type}
                    onValueChange={(value) => setType(value)}
                  >
                    <SelectTrigger className="w-[180px] col-span-3">
                      <SelectValue placeholder="Investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Angel">Angel</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="VC">VC</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="stage" className="text-right">
                    Stage
                  </Label>
                  <Select
                    value={stage}
                    onValueChange={(value) => setStage(value)}
                  >
                    <SelectTrigger className="w-[180px] col-span-3">
                      <SelectValue placeholder="Funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pre Seed">Pre Seed</SelectItem>
                        <SelectItem value="Seed">Seed</SelectItem>
                        <SelectItem value="Series A">Series A</SelectItem>
                        <SelectItem value="Series B">Series B</SelectItem>
                        <SelectItem value="Series C">Series C</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    className="col-span-3"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Record</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {isDeleteDialogOpen && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Investor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you wish to delete this investor record?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteRecord(investor.id);
              }}
              className="dark:bg-red-900 dark:hover:bg-red-700/90 dark:text-slate-50"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
export default ActionMenu;
