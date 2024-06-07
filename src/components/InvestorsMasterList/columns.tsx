import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
import ActionMenu from "./table_components/ActionMenu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Investor = {
  id: number;
  name: string;
  type: "VC" | "Angel" | "PE" | "Corporate" | "Government";
  company: string | null;
  stage: "Pre Seed" | "Seed" | "Series A" | "Series B" | "Series C";
  email: string;
  updatedAt: string;
};

export const columns: ColumnDef<Investor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    accessorFn: (row: Investor | null) => (row && row.name ? row.name : "-"),
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
    accessorFn: (row: Investor | null) => (row && row.type ? row.type : "-"),
  },
  {
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: Investor | null) => (row && row.stage ? row.stage : "-"),
  },
  {
    accessorKey: "company",
    header: "Company",
    accessorFn: (row: Investor | null) =>
      row && row.company ? row.company : "-",
  },
  {
    accessorKey: "email",
    header: "Email",
    accessorFn: (row: Investor | null) => (row && row.email ? row.email : "-"),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // accessorFn: (originalRow: { updatedAt: string }) => originalRow.updatedAt,
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      const date = new Date(updatedAt); // Convert updatedAt to a Date object
      return (
        <div>
          {date.toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      );
    },
  },
  // ADD CHECKBOX TO SELECT ROWS
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
  // },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const investor = row.original;

      return<ActionMenu investor={investor} /> ;
    },
  },
];
