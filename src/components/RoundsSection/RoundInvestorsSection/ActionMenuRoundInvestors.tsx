import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

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

import { RoundInvestor } from "./columns";

const ActionMenuRoundInvestors = ({
  investor,
}: {
  investor: RoundInvestor;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user, getAccessTokenSilently } = useAuth0();

  // Investor details of row selected
  const { id, raised, committed } = investor;
  console.log("investor", investor);

  // To change raised type if DB issue can be resolved
  const [selectedRaised, setSelectedRaised] = useState(Number(raised));
  const [selectedCommitted, setSelectedCommitted] = useState(Number(committed));

  const deleteRecord = async (id: number) => {
    const auth0Id = user?.sub;
    const token = await getAccessTokenSilently();
    try {
      const result = await axios.delete(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/startup/${auth0Id}/roundInvestors/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      toast({
        description: "Investor succesfully removed from round",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const editRecord = async (id: number) => {
    const auth0Id = user?.sub;
    const token = await getAccessTokenSilently();
    try {
      const body = {
        raised: selectedRaised,
        committed: selectedCommitted,
      };
      console.log(body);

      const result = await axios.put(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/startup/${auth0Id}/roundInvestors/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("result", result);
      toast({
        description: "Investor funds succesfully updated",
      });
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
                editRecord(id);
                setIsEditDialogOpen(false);
              }}
            >
              <DialogHeader>
                <DialogTitle>Edit Round Investor Details</DialogTitle>
                <DialogDescription>
                  Update an investor record in this funding round
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-8 py-4 mt-2">
                <div className="grid grid-cols-4 items-center gap-6 my-3">
                  <Label htmlFor="raised" className="text-right">
                    Raised
                  </Label>
                  <Input
                    id="raised"
                    type="number"
                    min="0"
                    value={selectedRaised}
                    className="col-span-3"
                    placeholder="Enter amount raised from investor"
                    // To change raised type if DB issue can be resolved
                    onChange={(e) => setSelectedRaised(Number(e.target.value))}
                  />
                  <Label htmlFor="committed" className="text-right">
                    Committed
                  </Label>
                  <Input
                    id="committed"
                    type="number"
                    min="0"
                    value={selectedCommitted}
                    className="col-span-3"
                    placeholder="Enter amount committed from investor"
                    onChange={(e) =>
                      setSelectedCommitted(Number(e.target.value))
                    }
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
              Are you sure you wish to remove the investor from this funding
              round?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteRecord(id);
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
export default ActionMenuRoundInvestors;
