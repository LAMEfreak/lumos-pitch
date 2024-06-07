import { ColumnDef } from "@tanstack/react-table";
import ActionMenuRoundInvestors from "./ActionMenuRoundInvestors";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Change typecast of raised if column type issue can be resolved
export type RoundInvestor = {
  id: number;
  roundId: number;
  investorId: number;
  raised: string | number;
  committed: number;
  investor: {
    company: string;
    email: string;
    name: string;
    type: string;
  };
};

export const columns: ColumnDef<RoundInvestor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.investor.name ? row.investor.name : "-",
  },
  {
    accessorKey: "raised",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Raised
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.raised ? row.raised : "-",
  },
  {
    accessorKey: "committed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Committed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.committed ? row.committed : "-",
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.investor.type ? row.investor.type : "-",
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.investor.company ? row.investor.company : "-",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.investor.email ? row.investor.email : "-",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const investor = row.original;

      return <ActionMenuRoundInvestors investor={investor} />;
    },
  },
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];
